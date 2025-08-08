# ---- CONFIG ----
DOMAIN="solo-platform"
OWNER="058264235144"
REGION="eu-central-1"
REPO="npm-solo"
SCOPE="solo"

# ---- FETCH TOKEN ----
echo "Fetching CodeArtifact token..."
TOKEN=$(aws codeartifact get-authorization-token \
  --domain "$DOMAIN" \
  --domain-owner "$OWNER" \
  --region "$REGION" \
  --query authorizationToken \
  --output text)

if [ -z "$TOKEN" ]; then
  echo "❌ Failed to retrieve token. Check AWS credentials and CodeArtifact settings."
  exit 1
fi

# ---- WRITE .npmrc ----
echo "Generating .npmrc file..."

REGISTRY_URL="https://${DOMAIN}-${OWNER}.d.codeartifact.${REGION}.amazonaws.com/npm/${REPO}/"

echo "@$SCOPE:registry=$REGISTRY_URL" > .npmrc

echo "//${DOMAIN}-${OWNER}.d.codeartifact.${REGION}.amazonaws.com/npm/${REPO}/:_authToken=$TOKEN" >> .npmrc
echo "save-exact=true" >> .npmrc
echo "legacy-peer-deps=true" >> .npmrc
echo "always-auth=true" >> .npmrc

echo "✅ .npmrc created. You can now run 'npm install'"