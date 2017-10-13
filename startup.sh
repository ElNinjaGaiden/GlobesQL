if [ $NODE_ENV = "production" ]; then
    harp server ./build/index.html --port $PORT;
else
    react-scripts start;
fi