// 日期格式转换
const dateFmt = (data) => {
	const outdate = new Date(Date.parse(data));
	return `${outdate.getFullYear()}-${
		outdate.getMonth() + 1
	}-${outdate.getDate()}`;
};

export default dateFmt;
