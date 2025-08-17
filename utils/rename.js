import fs from 'fs';
import path from 'path';

function replaceExtensions(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceExtensions(fullPath); // Recurse into directories
        } else if (fullPath.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            // Modify only import paths containing a '/'
            let modified = content.replace(/from\s*['"]((?![^'"]*@[a-zA-Z0-9_-]+\/).*)\/([^'"]*)['"]/g, "from '$1/$2.js'");

            // let modified = content.replace(/from '([^']*)\/([^']*)'/g, "from '$1/$2.js'");
            fs.writeFileSync(fullPath, modified, 'utf8');
        }
    });
}

replaceExtensions('./dist');
