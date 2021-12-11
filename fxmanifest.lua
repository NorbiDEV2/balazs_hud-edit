fx_version 'bodacious'
games { 'gta5' }

author 'balazs'
description 'HUD'
version '0.0.1'

client_scripts {
    'client.lua',
}

server_scripts {
    'server.lua',
    '@mysql-async/lib/MySQL.lua',
}

ui_page 'html/index.html'

files {
    'html/index.html',
    'html/script.js',
    'html/style.css',     
}