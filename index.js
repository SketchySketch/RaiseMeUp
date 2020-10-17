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
		},
	}),
	runner = Runner.create();

Render.run(render);
Runner.run(runner, engine);

// Walls
var roof = Bodies.rectangle(400, 0, 800, 50, {
	isStatic: false,
	mass: 3,
	friction: 0.0001,
	render: {
		fillStyle: "#888",
	},
});
var scoreArea = Bodies.rectangle(0, 75, 1600, 200, {
	isStatic: true,
	collisionFilter: -1,
	render: {
		fillStyle: "#4a45"
	}
});
World.add(world, [
	Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
	Bodies.rectangle(800, 300, 30, 600, { isStatic: true, friction: 1 }),
	Bodies.rectangle(0, 300, 30, 600, { isStatic: true, friction: 1 }),
	roof,
	scoreArea,
]);

// Bodies
var left = Bodies.rectangle(200, 550, 400, 50, {
		friction: 1,
		render: {
			fillStyle: "#29e",
		},
	}),
	right = Bodies.rectangle(600, 550, 400, 50, {
		friction: 1,
		render: {
			fillStyle: "#f0c",
		},
	}),
	ball = Bodies.circle(400, 100, 50, { friction: 0.0001 });
World.add(world, [left, right, ball]);

// Manipulate

document.body.onkeydown = (e) => {
	switch (e.keyCode) {
		case 90:
			Body.setAngularVelocity(left, -0.1);
			break;
		case 191:
			Body.setAngularVelocity(right, 0.1);
			break;
		case 83:
			alert("Your score: " + Math.round(score));
		default:
			break;
	}
};

// Score
var score = 0;
Events.on(engine, "beforeUpdate", (e) => {
	if (ball.position.y < 150) {
		score += 0.1;
		ball.render.fillStyle = "#4fa"
	} else {
		ball.render.fillStyle = "#f44"
	}
	if (! (0 < ball.position.x < 800)) alert("The ball fell out! Refresh and restart!")
});
