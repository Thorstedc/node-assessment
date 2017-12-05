const userData = require('./userData.json')

module.exports = {

	getUsers: (req, res, next) => {
		let userArr = userData;
		if (req.query.age) {
			userArr = userArr.filter( val => {
				return val.age < req.query.age;
			});
		}
		if (req.query.lastname) {
			userArr = userArr.filter( val => {
				return val.last_name === req.query.lastname;
			});
		}
		if (req.query.email) {
			userArr = userArr.filter( val => {
				return val.email === req.query.email;
			});
		}
		if (req.query.favorites) {
			userArr = userArr.filter( val => {
				return val.favorites.includes(req.query.favorites);
			});
		}
		res.status(200).json(userArr);
		return;
	},
	getUserById: (req, res, next) => {
		if (req.params.id) {
			for (let obj of userData) {
				if (obj.id == req.params.id) {
					res.json(obj);
					return;
				}
			}
			res.status(404).json(null);
		}
	},
	getAdmins: (req, res, next) => {
		userArr = userData.filter( val => val.type == 'admin');
		res.status(200).json(userArr);
		return;
	},
	getNonadmins: (req, res, next) => {
		userArr = userData.filter( val => val.type !== 'admin');
		res.status(200).json(userArr);
		return;
	},
	getUsersByType: (req, res, next) => {
		userArr = userData.filter( val => val.type == req.params.type);
		res.status(200).json(userArr);
		return;
	},
	changeUserInfo: (req, res, next) => {
		let userArr = userData;
		for (let i = 0; i < userArr.length; i++){
			if (userArr[i].id == req.params.id) {
				userArr[i] = req.body;
				res.status(200).json(userArr);
				return;
			}
		}
		res.status(200).json(userArr);
		return;
	},
	addUser: (req, res, next) => {
		let user = req.body;
		user.id = userData.length + 1;
		userData.push(user);
		res.status(200).json(userData);
		return;
	},
	deleteUser: (req, res, next) => {
		let userArr = userData;
		for (let i = 0; i < userArr.length; i++){
			if (userArr[i].id == req.params.id) {
				userArr.splice(i, 1);
				res.status(200).json(userArr);
				return;
			}
		}
	}
}
