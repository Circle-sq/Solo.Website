if [ "$#" -eq  "0" ]
then
    echo "No arguments supplied"

    npm run start_dev_watch
else
    echo "Run docker image ->" $1

    cd ./node_task/run
    image=$1 docker-compose -f composer_base_config.json up
fi