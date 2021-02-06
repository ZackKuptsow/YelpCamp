const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
	console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedImages = [
	{
		url:
			'https://res.cloudinary.com/ddj56opwy/image/upload/v1612478185/YelpCamp/h15n3wuxbx2l5wklyvze.jpg',
		filename: 'YelpCamp/h15n3wuxbx2l5wklyvze'
	},
	{
		url:
			'https://res.cloudinary.com/ddj56opwy/image/upload/v1612478185/YelpCamp/oh0fxtdtasopmif8dtur.jpg',
		filename: 'YelpCamp/oh0fxtdtasopmif8dtur'
	},
	{
		url:
			'https://res.cloudinary.com/ddj56opwy/image/upload/v1612478185/YelpCamp/ygnnlzvbfujrjxb4oqrv.jpg',
		filename: 'YelpCamp/ygnnlzvbfujrjxb4oqrv'
	},
	{
		url:
			'https://res.cloudinary.com/ddj56opwy/image/upload/v1612478185/YelpCamp/oykyxkegnqk89qagpqt3.jpg',
		filename: 'YelpCamp/oykyxkegnqk89qagpqt3'
	},
	{
		url:
			'https://res.cloudinary.com/ddj56opwy/image/upload/v1612478186/YelpCamp/m0ovf88lhzrbm3jpjyly.jpg',
		filename: 'YelpCamp/m0ovf88lhzrbm3jpjyly'
	},
	{
		url:
			'https://res.cloudinary.com/ddj56opwy/image/upload/v1612478186/YelpCamp/sx4kqetbcuskjuy6195z.jpg',
		filename: 'YelpCamp/sx4kqetbcuskjuy6195z'
	},
	{
		url:
			'https://res.cloudinary.com/ddj56opwy/image/upload/v1612478186/YelpCamp/lnv8ewlsmyaozstgjukp.jpg',
		filename: 'YelpCamp/lnv8ewlsmyaozstgjukp'
	},
	{
		url:
			'https://res.cloudinary.com/ddj56opwy/image/upload/v1612478187/YelpCamp/qvmghud50b3k2qkdppgl.jpg',
		filename: 'YelpCamp/qvmghud50b3k2qkdppgl'
	},
	{
		url:
			'https://res.cloudinary.com/ddj56opwy/image/upload/v1612478187/YelpCamp/vxsbfxb2klfyrxul22ce.jpg',
		filename: 'YelpCamp/vxsbfxb2klfyrxul22ce'
	},
	{
		url:
			'https://res.cloudinary.com/ddj56opwy/image/upload/v1612478187/YelpCamp/oda4vfmtdss9ocrbuzcq.jpg',
		filename: 'YelpCamp/oda4vfmtdss9ocrbuzcq'
	},
	{
		url:
			'https://res.cloudinary.com/ddj56opwy/image/upload/v1612478187/YelpCamp/bf9ccmaqdby3pvr1wkue.jpg',
		filename: 'YelpCamp/bf9ccmaqdby3pvr1wkue'
	},
	{
		url:
			'https://res.cloudinary.com/ddj56opwy/image/upload/v1612478187/YelpCamp/g1tajgbgesqozau5k4tq.jpg',
		filename: 'YelpCamp/g1tajgbgesqozau5k4tq'
	},
	{
		url:
			'https://res.cloudinary.com/ddj56opwy/image/upload/v1612478188/YelpCamp/kja1tstgablt8lbeiqsb.jpg',
		filename: 'YelpCamp/kja1tstgablt8lbeiqsb'
	},
	{
		url:
			'https://res.cloudinary.com/ddj56opwy/image/upload/v1612478188/YelpCamp/feu7vtnvrkmbbvimeryd.jpg',
		filename: 'YelpCamp/feu7vtnvrkmbbvimeryd'
	},
	{
		url:
			'https://res.cloudinary.com/ddj56opwy/image/upload/v1612478188/YelpCamp/rfsbn7oykgil0tkxw6pr.jpg',
		filename: 'YelpCamp/rfsbn7oykgil0tkxw6pr'
	},
	{
		url:
			'https://res.cloudinary.com/ddj56opwy/image/upload/v1612478188/YelpCamp/ldlcpvidwasm7x8lu0qa.jpg',
		filename: 'YelpCamp/ldlcpvidwasm7x8lu0qa'
	},
	{
		url:
			'https://res.cloudinary.com/ddj56opwy/image/upload/v1612478189/YelpCamp/rwuz9zk4csio0unt7etz.jpg',
		filename: 'YelpCamp/rwuz9zk4csio0unt7etz'
	},
	{
		url:
			'https://res.cloudinary.com/ddj56opwy/image/upload/v1612478189/YelpCamp/ngwyvrdvj4riv6fstpny.jpg',
		filename: 'YelpCamp/ngwyvrdvj4riv6fstpny'
	},
	{
		url:
			'https://res.cloudinary.com/ddj56opwy/image/upload/v1612478189/YelpCamp/bdjgbvdix0yjrungqib4.jpg',
		filename: 'YelpCamp/bdjgbvdix0yjrungqib4'
	},
	{
		url:
			'https://res.cloudinary.com/ddj56opwy/image/upload/v1612478189/YelpCamp/qdzhwnkkbfyirxibvrk9.jpg',
		filename: 'YelpCamp/qdzhwnkkbfyirxibvrk9'
	},
	{
		url:
			'https://res.cloudinary.com/ddj56opwy/image/upload/v1612478189/YelpCamp/zgxyizpckttvnldnsrfe.jpg',
		filename: 'YelpCamp/zgxyizpckttvnldnsrfe'
	},
	{
		url:
			'https://res.cloudinary.com/ddj56opwy/image/upload/v1612478189/YelpCamp/msb4st2hf6ey1snxgn1i.jpg',
		filename: 'YelpCamp/msb4st2hf6ey1snxgn1i'
	},
	{
		url:
			'https://res.cloudinary.com/ddj56opwy/image/upload/v1612478190/YelpCamp/nptudwhcvrpuikscllrw.jpg',
		filename: 'YelpCamp/nptudwhcvrpuikscllrw'
	},
	{
		url:
			'https://res.cloudinary.com/ddj56opwy/image/upload/v1612478190/YelpCamp/wmcrvpyvqh5nxueeb4sq.jpg',
		filename: 'YelpCamp/wmcrvpyvqh5nxueeb4sq'
	}
];

const shuffleImages = array => {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		let temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
};

const seedDB = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 250; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 20) + 10;
		const camp = new Campground({
			author: '601ad4bd0886d3516d1aef45',
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			description:
				'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea a reprehenderit accusantium necessitatibus temporibus nostrum, iste dolore placeat eveniet non doloribus, quisquam ex deserunt blanditiis quos dolorem distinctio officia laudantium.',
			price,
			geometry: {
				type: 'Point',
				coordinates: [
					cities[random1000].longitude,
					cities[random1000].latitude
				]
			},
			images: shuffleImages(seedImages)
		});
		await camp.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
