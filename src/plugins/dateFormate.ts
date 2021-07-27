const dateFmt = (data) => {
	const date = new Date(data);
	return `${date.getFullYear()}年${date.getMonth()}月${date.getDay()}日`;
};

export default dateFmt;
