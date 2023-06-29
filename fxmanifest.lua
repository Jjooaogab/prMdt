client_script "@vrp/lib/lib.lua"

fx_version 'adamant'
game 'gta5'


name 'Panel MDT'
author 'Primavera Scripts'
version '1.0-SNAPSHOT'

dependencies{
	'vrp',
}
client_scripts {
  "@vrp/lib/utils.lua",
  "client.lua",
}

server_scripts {
  "@vrp/lib/utils.lua",
  "@mysql-async/lib/MySQL.lua",
  "server.lua"
}

files {
  "nui/index.html",
  "nui/styles.css",
  "nui/script.js"
}

ui_page "nui/index.html"


