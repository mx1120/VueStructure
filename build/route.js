/**
 * Created by Administrator on 2018/3/14.
 */

//读取map文件夹下所有文件
let fs = require('fs'),
	path = require('path'),
	routes = [],
	fileContent = `//routes自动生成的文件,执行 npm run route 可以生成此文件\r\n//只需在map文件夹定义不同的路由,即可自动import进此项目\r\n`,
	exportsArray = []

let targetFileName = path.join(__dirname, '../src/router/routesMaker.js')

function traversal(_path) {
	let dirList = fs.readdirSync(_path);
	dirList.forEach(fileName => {
		if (fs.statSync(_path + '/' + fileName).isDirectory()) {
			traversal(_path + '/' + fileName)
		} else {
			routes.push(_path + '/' + fileName)
		}
	});
}

function makeRoute(){

	traversal('./src/router/map');

	routes.forEach((route,i) => {
		route = route.split('./src/router/map').join('./map')
		fileContent += 'import route' + i + ' from "'+route + '"\r\n';
		exportsArray.push('route' + i)
	})

	fileContent += `let routes = []\r\nlet myRoutes = routes.concat(${exportsArray.join(',')})\r\nexport default myRoutes;`

	fs.writeFileSync(targetFileName, fileContent, 'utf8');
}

makeRoute()