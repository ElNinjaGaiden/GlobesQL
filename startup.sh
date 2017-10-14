if [ $NODE_ENV = "production" ]; then
    harp server build/ --port $PORT;
    #react-scripts start;
else
    react-scripts start;
fi