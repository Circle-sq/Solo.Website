import path from 'path';

const rule = {
    meta: {
        type: 'problem',
        docs: {
            description: "Prevent files in 'src/features/' from importing anything from 'src/*'",
            category: 'Best Practices',
            recommended: false,
        },
        messages: {
            noImportFromSrc: "Files in 'src/features/' cannot import from 'src/*'. Found: '{{importPath}}'.",
        },
        schema: [], // No options needed
    },

    create(context) {
        return {
            ImportDeclaration(node) {
                const filePath = context.filename; // ✅ Use context.filename instead of deprecated getFilename()
                const importPath = node.source.value;

                // Ensure the file is inside `src/features/`
                if (!filePath.includes(path.normalize('src/features/'))) {
                    return;
                }

                // Disallow imports starting with "src/"
                if (typeof importPath === 'string' && importPath.startsWith('src/')) {
                    context.report({
                        node,
                        messageId: 'noImportFromSrc',
                        data: { importPath },
                    });
                }
            },
        };
    },
};

export default {
    rules: {
        'no-import-from-src-in-features': rule,
    },
};
