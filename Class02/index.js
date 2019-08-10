
(function () {
	function prepare() {
		const imgTask = (img, src) => {
			return new Promise(function (resolve, reject) {
				img.onload = resolve;
				img.onerror = reject;
				img.src = src;
			});
		};

		const context = document.getElementById('content').getContext('2d');
		const heroImg = new Image();
		const allSpriteImg = new Image();
		const allresourceTask = Promise.all([
			imgTask(heroImg, './hero.png'),
			imgTask(allSpriteImg, './all.jpg'),
		]);

		return {
			getResource(callback) {
				allresourceTask.then(function () {
					callback && callback(context, heroImg, allSpriteImg);
				});
			}
		};
	}

	function drawHero(context, heroImg, allSpriteImg) {
		console.log(context)
		var hero = new Hero({x: 0, y: 0}, context, heroImg)
		var monster = new Monster({x: 120, y: 120}, context, allSpriteImg)
		var monster = new Monster({x: 120, y: 120}, context, allSpriteImg)
		
		document.onkeydown = function (e) {
			hero.keyMove(e.keyCode)
		}

		hero.draw()
		monster.draw()
	}

	var resourceManager = prepare();
	resourceManager.getResource(function (context, heroImg, allSpriteImg) {
		drawHero(context, heroImg, allSpriteImg);
	});
})();