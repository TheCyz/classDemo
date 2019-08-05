/**
 * yuanxin
 */

// (function () {
// 	// 准备资源 汪洋
	// const context = document.getElementById('content').getContext('2d');
	// const heroImg = new Image();

// 	// 画图 袁鑫
// 	heroImg.onload = function () {
// 		var imgPos = {
// 			x: 0,
// 			y: 0,
// 			width: 32,
// 			height: 32
// 		};

// 		var rect = {
// 			x: 0,
// 			y: 0,
// 			width: 40,
// 			height: 40
// 		};

// 		context
// 			.drawImage(
// 				heroImg,
// 				imgPos.x,
// 				imgPos.y,
// 				imgPos.width,
// 				imgPos.height,
// 				rect.x,
// 				rect.y,
// 				rect.width,
// 				rect.height
// 			);
// 	};

// 	heroImg.src = './hero.png';
// })();



(function () {
	// 我是汪洋老师
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
			/**
			 * @param {Function} [callback] - 当准备好了之后要调用的回掉函数
			 */
			getResource(callback) {
				allresourceTask.then(function () {
					callback && callback(context, heroImg, allSpriteImg);
				});
			}
		};
	}

	// 我是袁鑫老师
	function drawHero(context, heroImg, allSpriteImg) {

		var draw = function () {
			this.context
				.drawImage(
					this.img,
					this.imgPos.x,
					this.imgPos.y,
					this.imgPos.width,
					this.imgPos.height,
					this.rect.x,
					this.rect.y,
					this.rect.width,
					this.rect.height
				);
		}

		var clearDraw = function () {
			this.context.clearRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
		}

		var keyMove = function (code) {
			this.clearDraw();
			switch(code) {
				case 37:
					if (this.rect.x > 0 && this.collision(this.rect.x - this.rect.width, this.rect.y)) {
						this.rect.x -= this.rect.width;
					}
					break;
				case 38:
					if (this.rect.y > 0 && this.collision(this.rect.x, this.rect.y - this.rect.height)) {
						this.rect.y -= this.rect.height;
					}
					break;
				case 39:
					if (this.rect.x < 480 && this.collision(this.rect.x + this.rect.width, this.rect.y)) {
						this.rect.x += this.rect.width;
					}
					break;
				case 40:
					if (this.rect.y < 280 && this.collision(this.rect.x, this.rect.y + this.rect.height)) {
						this.rect.y += this.rect.height;
					}
					break;
			}
			this.draw();
		}

		var collision = function (x, y) {
			return !(x === monster.rect.x && y === monster.rect.y);
		}

		var hero = {
			img: heroImg,
			context: context,
			imgPos: {
				x: 0,
				y: 0,
				width: 32,
				height: 32
			},

			rect: {
				x: 0,
				y: 0,
				width: 40,
				height: 40
			},

			draw: draw,
			clearDraw: clearDraw,
			keyMove: keyMove,
			collision: collision
		};

		var monster = {
			img: allSpriteImg,
			context: context,
			imgPos: {
				x: 858,
				y: 529,
				width: 32,
				height: 32
			},

			rect: {
				x: 120,
				y: 120,
				width: 40,
				height: 40
			},

			draw: draw
		};

		document.onkeydown = function (e) {
			// console.log(hero.keyMove)
			hero.keyMove(e.keyCode);
		}

		

		hero.draw();
		monster.draw();
	}

	var resourceManager = prepare();
	resourceManager.getResource(function (context, heroImg, allSpriteImg) {
		drawHero(context, heroImg, allSpriteImg);
	});
})();