const Engine = Matter.Engine,
	Render = Matter.Render,
	Runner = Matter.Runner,
	World = Matter.World,
	Bodies = Matter.Bodies,
	Body = Matter.Body,
	Events = Matter.Events;

var engine = Engine.create(),
	world = engine.world,
	render = Render.create({
		element: document.body,
		engine: engine,
		options: {
			width: 800,
			height: 600,
			wireframes: false,
			background: "#000",
		},
	}),
	runner = Runner.create();

Render.run(render);
Runner.run(runner, engine);

// Walls
var roof = Bodies.rectangle(400, 0, 775, 50, {
	isStatic: false,
	mass: 3,
	friction: 0.0001,
	render: {
		fillStyle: "#666",
	},
});
var scoreArea = Bodies.rectangle(0, 75, 1600, 200, {
	isStatic: true,
	collisionFilter: -1,
	render: {
		fillStyle: "#2823",
	},
});
World.add(world, [
	Bodies.rectangle(400, 600, 800, 50, {
		isStatic: true,
		render: { fillStyle: "#000" },
	}),
	Bodies.rectangle(800, 300, 30, 600, {
		isStatic: true,
		friction: 1,
		render: { fillStyle: "#000" },
	}),
	Bodies.rectangle(0, 300, 30, 600, {
		isStatic: true,
		friction: 1,
		render: { fillStyle: "#000" },
	}),
	roof,
	scoreArea,
]);

// Bodies
var left = Bodies.rectangle(200, 550, 375, 50, {
		friction: 1,
		render: {
			fillStyle: "#29e5",
		},
	}),
	right = Bodies.rectangle(550, 550, 375, 50, {
		friction: 1,
		render: {
			fillStyle: "#f0c5",
		},
	}),
	ball = Bodies.circle(400, 100, 50, { friction: 0.0001 });
World.add(world, [left, right, ball]);

// Manipulate

document.body.onkeydown = (e) => {
	switch (e.keyCode) {
		case 90:
			Body.setAngularVelocity(left, -0.1);
			left.render.fillStyle = "#29e";
			break;
		case 191:
			Body.setAngularVelocity(right, 0.1);
			right.render.fillStyle = "#f0c";
			break;
		default:
			break;
	}
};
document.body.onkeyup = (e) => {
	switch (e.keyCode) {
		case 90:
			left.render.fillStyle = "#29e5";
			break;
		case 191:
			right.render.fillStyle = "#f0c5";
			break;
		default:
			break;
	}
};

// Score
var score = 0;
Events.on(engine, "beforeUpdate", (e) => {
	document.getElementById("score").innerHTML = Math.floor(score);
	if (ball.position.y < 150) {
		score += 0.1;
		ball.render.fillStyle = "#4fa";
	} else if (ball.position.y > 150 && ball.position.y < 400) {
		ball.render.fillStyle = "#aa4";
	} else {
		ball.render.fillStyle = "#f44";
	}
	if (0 > ball.position.x || ball.position.x > 800) {
		alert("The ball fell out! Refresh and restart!");
		Events.off(engine, "beforeUpdate");
	}
});
