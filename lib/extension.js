const cp = require('child_process');
const fs = require('fs');
const path = require('path');
const { AutoLanguageClient } = require('atom-languageclient');

class VisualforceLanguageServer extends AutoLanguageClient {
  getGrammarScopes() {
    return ['source.visualforce'];
  }

  getLanguageName() {
    return 'Visualforce';
  }

  getServerName() {
    return 'Visualforce LSP';
  }

  startServerProcess(projectPath) {
    const args = path.join(
      'node_modules',
      '@salesforce',
      'salesforcedx-visualforce-language-server',
      'out',
      'src',
      'visualforceServer.js'
    );
    return super.spawnChildNode([args, '--stdio'], {
      cwd: path.join(__dirname, '..')
    });
  }

  getInitializeParams(projectPath, process) {
    return {
      processId: process.pid,
      capabilities: {
        textDocument: {
          completion: {
            completionItem: {
              snippetSupport: true
            }
          }
        }
      },
      rootPath: projectPath
    };
  }
}

module.exports = new VisualforceLanguageServer();
