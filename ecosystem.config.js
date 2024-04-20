module.exports = {
  apps: [
    {
      name: "app",
      script: "./www/app.js",
      env_production: {
        NODE_ENV: "production",
        PORT: 3000
      },
      max_memory_restart: "200M",
      error_file: "./logs/error.log",
      instances: 3,
      exec_mode: "cluster",
    },
  ],
};

//"pm2 start -i 3" permet de lancer l'app avec 3 instances
