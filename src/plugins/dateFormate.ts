// 日期格式转换
const dateFmt = date => {

	const outdate = new Date(Date.parse(date));

	return `${outdate.getFullYear()}-${outdate.getMonth() + 1}-${outdate.getDate()}`;
};

export default dateFmt;
