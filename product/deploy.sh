# chmod +x ./product/deploy.sh // grant excution permission if needed

KEY_PATH="/home/hahan/AWS/keys/vape.pem"
USER="ec2-user"
HOST="ec2-52-221-135-46.ap-southeast-1.compute.amazonaws.com"
REMOTE_DIR="vape-admin-be"

echo "Building project..."
npm run build

echo "Syncing node_modules..."
rsync -az --delete -e "ssh -i $KEY_PATH" node_modules/ $USER@$HOST:$REMOTE_DIR/node_modules

echo "Syncing dist..."
rsync -az --delete -e "ssh -i $KEY_PATH" dist/ $USER@$HOST:$REMOTE_DIR/dist

echo "Syncing ecosystem.config.js..."
rsync -az --delete -e "ssh -i $KEY_PATH" ecosystem.config.js $USER@$HOST:$REMOTE_DIR/ecosystem.config.js

echo "Syncing env..."
rsync -az --delete -e "ssh -i $KEY_PATH" .env.product $USER@$HOST:$REMOTE_DIR/.env

echo "Restarting PM2 app on remote server..."
ssh -i "$KEY_PATH" $USER@$HOST "cd $REMOTE_DIR && pm2 startOrRestart ecosystem.config.js"
