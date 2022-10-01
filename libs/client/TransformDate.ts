export default function TransformDate(value:Date) {

    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    const betweenTimeHour = Math.floor(betweenTime / 60);
    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);

    if (betweenTime < 1) return '수초 전';
    if (betweenTime < 60) return `${betweenTime}분 전`
    if (betweenTimeHour < 24) return `${betweenTimeHour}시간 전`
    if (betweenTimeDay < 365) return `${betweenTimeDay}일 전`
    return `${Math.floor(betweenTimeDay / 365)}년 전`
    
}