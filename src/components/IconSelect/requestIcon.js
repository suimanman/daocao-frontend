const iconsVite=import.meta.glob('../../assets/icons/svg/*.svg')
//icon数组，最终导出
let icons=[];
//正则表达式，根据正则表达式匹配svg文件
const re=/\.\/(.*)\.svg/

for(const icon in iconsVite){
    let name=icon.match(re)[1].substring(icon.match(re)[1].lastIndexOf('/')+1)
    icons.push(name)
}
export default icons;
