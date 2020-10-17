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
	render: {
		fillStyle: "#888",
	},
});
roof.mass = 1;
World.add(world, [
	roof,
	Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
	Bodies.rectangle(800, 300, 30, 600, { isStatic: true }),
	Bodies.rectangle(0, 300, 30, 600, { isStatic: true }),
]);

// Bodies
var left = Bodies.rectangle(200, 550, 400, 50, {
		render: {
			fillStyle: "#29e",
		},
	}),
	right = Bodies.rectangle(600, 550, 400, 50, {
		render: {
			fillStyle: "#f0c",
		},
	}),
	ball = Bodies.circle(400, 100, 50);
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
	if (ball.position.y < 100) score += 0.1;
});
