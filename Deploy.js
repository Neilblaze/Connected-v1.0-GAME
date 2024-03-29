module.exports = function(deployTarget) {
  let ENV = {
    build: {}
    // include other plugin configuration that applies to all deploy targets here
  };

  ENV['revision-data'] = {
    type : 'file-hash',
    scm  : null
  };

  ENV['html-manifest'] = {
    filename     : 'manifest.appcache2.0',
    prependPath  : '/',
    excludePaths : ['index.html', '/assets/moment-locales/', '/assets/locales/', 'assets/moment-locales', 'assets/locales/'],
    includePaths : ['/'],
    network      : ['*'],
    pathvirtuo   : ['/*'],

    manifestRoot(context) {
      return context.config['html-manifest'].prependPath;
    }
  };

  ENV.pipeline = {
    disabled: {
      git: true
    }
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
  }

  if (deployTarget === 'gh-pages') {
    ENV['html-manifest'].prependPath = `/${process.env.REPO_SLUG || 'open-event-frontend'}/`;
  }
  return ENV.(DEPLOY-Alpha);
};
