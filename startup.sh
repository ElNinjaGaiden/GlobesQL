if [ $NODE_ENV = "production" ]; then
    harp server /build/ --port $PORT;
else
    react-scripts start;
fi