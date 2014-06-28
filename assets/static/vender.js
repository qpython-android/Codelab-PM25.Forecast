_.templateSettings = {interpolate : /\{\{(.+?)\}\}/g}

$(document).ready(function(){
    // 预约咨询页”显示更多button“click事件
    $('#order-new-show-more').click(function() {
        vender_new_orders();
    })

    $('#member-show-more').click(function() {
        var ORDER_LISTS_TMP = '<div><span>{{membername}}</span> <span>{{phone}}</span></div>';

        var page = $(this).attr('value');
        $.getJSON("http://che.aipipy.com/api/member/vendor/list/"+page, function(data) {
            if (data.length > 0) {
                $.each(data, function(key, value) {
                    $('#member-lists').append(_.template(ORDER_LISTS_TMP,{"membername":value[0], "phone":value[1]}));
                });
            }    
        });
        $('#member-lists').append('<p>第'+page+'页</p>');

        console.log(page);
        $(this).attr('value', Number(page)+1);
    })
});


//static define
var ORDER_LISTS_TMP = '<tr><td><div><div class="box fleft"><b>{{ ordername }}</b><br /><span style="display:block;word-break:break-all;white-space:normal"> {{ ordercomment }}</span><div><span>{{vehicle_province}} {{vehicle_plate}}</span></div>{{orderuser}} {{phone}}<div style="color:grey;">{{ time }}</div><div class="clear"></div></div>';

var ORDER_PULS_TMP = '<div class="box fright" style="margin-top:20px"><a class="glyphicon glyphicon-plus" id="{{idtype}}_fold_{{orderid}}" onclick="show_func(this.id)"></a></div><div class="clear"></div>'

var NEW_ORDER_FUNC_TMP = '<div style="display:none" id="{{idtype}}_func_{{orderid}}" class="btn-group btn-group-sm fright"><a type="button" class="btn btn-default glyphicon glyphicon-chevron-right" id="func-1-{{orderid}}" onclick="change_order_status(this.id)"><p>已确认</p></a><a type="button" class="btn btn-default glyphicon glyphicon-ban-circle" id="func-4-{{orderid}}" onclick="change_order_status(this.id)"><p>无效的</p></a><a type="button" class="btn btn-default glyphicon glyphicon-phone-alt" href=\'javascript:milib.call("{{phone}}")\'><p>联系</p></a></div></div></td></tr>'

var PROCESS_ORDER_FUNC_TMP = '<div style="display:none" id="{{idtype}}_func_{{orderid}}" class="btn-group btn-group-sm fright"><a type="button" class="btn btn-default glyphicon glyphicon-ok-circle" id="func-3-{{orderid}}" onclick="change_order_status(this.id)"><p>已完成</p></a><a type="button" class="btn btn-default glyphicon glyphicon-ban-circle" id="func-4-{{orderid}}" onclick="change_order_status(this.id)"><p>无效的</p></a><a type="button" class="btn btn-default glyphicon glyphicon-phone-alt" href=\'javascript:milib.call("{{phone}}")\'><p>联系</p></a></div></div></td></tr>'

// show more button click
function vender_orders_lists(idstr){
    var tmpstr = idstr.split('-')
    var idtype = tmpstr[1]
    var orderstats = 0
    var final_templ = ''
    switch(idtype) {
        case 'newest':
            orderstats = '1'
            final_templ = ORDER_LISTS_TMP+ORDER_PULS_TMP+NEW_ORDER_FUNC_TMP
            break
        case 'processing':
            orderstats = '2'
            final_templ = ORDER_LISTS_TMP+ORDER_PULS_TMP+PROCESS_ORDER_FUNC_TMP
            break
        case 'finished':
            orderstats = '4'
            final_templ = ORDER_LISTS_TMP+'</div></td></tr>'
            break
        case 'invalid':
            orderstats = '3'
            final_templ = ORDER_LISTS_TMP+'</div></td></tr>'
            break
    }

    var page = $("#order-"+idtype+"-show-more").attr('value');
    var token = $('#token').attr('value');
    $.getJSON("/venderapi/order/"+token+'/'+orderstats+'/'+page, function(data) {
        //console.log(data);
        console.log(data.length);
        if (data.length > 0) {
            $.each(data, function(key, value) {
                /*
                $('#'+idtype+'-order-lists').append(_.template(ORDER_LISTS_TMP,{"orderuser":value[1].length == 0?"未知用户":value[1], "phone":value[2].length == 0?"":"("+value[2]+")", "ordername":value[3], "ordercomment":value[5], "time": value[6], "id":value[0], 'orderstatus':value[4]}));
                */
                switch(idtype) {
                    case "newest":
                        $('#'+idtype+'-order-lists').append(_.template(final_templ, {"orderuser":value[5].length == 0?"未知用户":value[5], "phone":value[6].length == 0?"":"("+value[6]+")", "ordername":value[1], "ordercomment":value[7], "time": value[8], 'orderstatus':value[2],'orderid':value[0], 'idtype':idtype,'vehicle_province':value[3],'vehicle_plate':value[4]}))
                        /*
                        $('#'+idtype+'-order-lists').append(_.template(ORDER_PULS_TMP,{'idtype':idtype, 'orderid':value[0]}))
                        $('#'+idtype+'-order-lists').append(_.template(NEW_ORDER_FUNC_TMP,{'idtype':idtype, 'orderid':value[0], 'phone':value[2]}))
                        */
                        break
                    case "processing":
                        $('#'+idtype+'-order-lists').append(_.template(final_templ, {"orderuser":value[5].length == 0?"未知用户":value[5], "phone":value[6].length == 0?"":"("+value[6]+")", "ordername":value[1], "ordercomment":value[7], "time": value[8], 'orderstatus':value[2], 'orderid':value[0], 'idtype':idtype,'vehicle_province':value[3],'vehicle_plate':value[4]}))
                        /*
                        $('#'+idtype+'-order-lists').append(_.template(ORDER_PULS_TMP,{'idtype':idtype, 'orderid':value[0]}))
                        $('#'+idtype+'-order-lists').append(_.template(PROCESS_ORDER_FUNC_TMP,{'idtype':idtype, 'orderid':value[0], 'phone':value[2]}))
                        */
                        break
                    default:
                        $('#'+idtype+'-order-lists').append(_.template(final_templ,{"orderuser":value[5].length == 0?"未知用户":value[5], "phone":value[6].length == 0?"":"("+value[6]+")", "ordername":value[1], "ordercomment":value[7], "time": value[8], 'orderstatus':value[2],'vehicle_province':value[3],'vehicle_plate':value[4]}))
                        break
                        //$('#'+idtype+'-order-lists').append('</div></td></tr>')
                }
            });
            $("#order-"+idtype+"-show-more").attr('value', Number(page)+1);
        } else {
            $("#order-"+idtype+"-show-more").attr('disabled',"disabled");
            $("#order-"+idtype+"-show-more").html('无更多数据')
        }
            //$('@order-lists').append('<tr><td>尚未预约过服务</td></tr>');
            //$('#order-show-more').attr('disabled',"disabled");
    });

    console.log(page);
    
}

//点击每个功能按钮后需要执行的动作
function change_order_status(idstr) {
    var token = $('#token').attr('value');
    var tmpstr = idstr.split('-')
    var id = tmpstr[2]
    var order_status = tmpstr[1]

    $.getJSON('/venderapi/change_order_status/'+token+'/'+order_status+'/'+id, function(data) {
        switch(data[0]['stat']) {
            case 0:
                alert('订单状态修改成功');
                window.location.reload()
                break;
            case 1:
                alert('订单状态修改失败，请重试');
                break;
        }
    })
}

// 点击+号
function show_func(idstr) {
    console.log(idstr)
    var tmpstr = idstr.split('_')
    id = tmpstr[2]
    idplace = tmpstr[0]
    $('#'+idplace+'_func_'+id).attr('style','width:60%');
    $('#'+idstr).attr('class','glyphicon glyphicon-minus');
    $('#'+idstr).attr('onclick', 'hide_func(this.id)');
}

function hide_func(idstr) {
    console.log(idstr)
    var tmpstr = idstr.split('_')
    id = tmpstr[2]
    idplace = tmpstr[0]
    $('#'+idplace+'_func_'+id).attr('style','display:none');
    $('#'+idstr).attr('class','glyphicon glyphicon-plus');
    $('#'+idstr).attr('onclick', 'show_func(this.id)');
}
