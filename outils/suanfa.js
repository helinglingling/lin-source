
// 谁在说谎
function whoIsTou(){
    // 描述为真1，为假0
    for(var i=0;i<4;i++){
        var dis_a = (i != 0) ? 1 : 0;
        var dis_b = (i == 2) ? 1 : 0;
        var dis_c = (i == 3) ? 1 : 0;
        var dis_d = 1 - dis_c;
        if(dis_a + dis_b + dis_c + dis_d == 3){
            return i;
        }
    }
}