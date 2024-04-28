module.exports = {
  apps : [{
    name: 'osmCacheMap',
    script: "./dist/index.js",
    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    //args: 'one two',
    instances: 1,
    autorestart: true,  
    watch: ['./dist/*'],
    watch_delay: 1000,
    ignore_watch : ['./'],
    max_memory_restart: '1G',
    env: {
      config: 'development'
    },
    env_production: {
      config: 'production'
    }
  }],

  /*deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }*/
};
