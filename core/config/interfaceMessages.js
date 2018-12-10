require('./themeColors');

module.exports = (obj) => {
			let str = '';
			for ( let [key, value] of Object.entries(obj))
			{
				switch (key) {
					case 'ct':
						str += `${value.ct} `;
						break;
					case 'cmd':
						str += `${value.c} `;
						break;
					case 'req':
						str += `${value.r} `;
						break;
					case 'opt':
						str += `${value.o} `;
						break;
					case 's':
						str += `${value.s} `;
						break;
					case 'err':
						str += `${value.er} `;
						break;
				}	
			}
			return str;
}