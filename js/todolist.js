$(function() {
    // 一.键盘按下,将数据保存到本地
    // a。.键盘按下回车keydown,判断键码值是否为13
    // b。首先需要判断本地浏览器是否有数据
    // c。有的话就把数据JSON.strinify进行转化，然后把数据push到数组
    // d。没有数据返回空数组，最后把存储到本地

    // 页面加载时执行load
    load();
    // 按下回车,保存用户输入的数据
    $("#title").on("keydown", function(e) {
        if (e.keyCode === 13) { //回车键
            if ($(this).val() === "") {
                alert("请输入您要的操作");
            } else {
                var local = getDate();
                // 更新local数据,把最新的数据追加到数组对象local中
                local.push({
                    title: $(this).val(),
                    done: false
                });
                // 把这个数组local存储到本地存储
                saveDate(local);
                // 然后渲染到页面
                load();
                // 清空输入框
                $(this).val("");
            }
        }
    });

    // 二。从本地取数据然后渲染到页面
    // a。读取本地的数据
    // b。清空ol，ul的内容
    // c。对数据进行遍历并进行拼接
    // d。将数据添加到盒子内部
    function load() {
        var data = getDate();
        $("ol,ul").empty();
        var todoCount = 0; //正在进行
        var doneCount = 0; //已完成
        // 遍历这个数据对象
        $.each(data, function(i, ele) {
            if (ele.done) { //已完成
                $("ul").prepend("<li><input type='checkbox' checked='checked' /><p>+" + ele.title + "</p><a href='javascript:;' id='" + i + "'></a></li>");
                doneCount++;
            } else { //正在进行
                $("ol").prepend("<li><input type='checkbox'/><p>+" + ele.title + "</p><a href='javascript:;' id='" + i + "'></a></li>");
                todoCount++;
            }
        });

        $("#todoCount").text(todoCount);
        $("#doneCount").text(doneCount);
    }
    // 三.执行正在进行和已完成选项操作
    $("ol,ul").on("click", "input", function() {
        /**
         * 根据checked的true和false来划分的在哪个事项里面
         *  */
        // 获取数据
        var data = getDate();
        // 修改数据,先知道数据的位置
        var index = $(this).siblings("a").attr("id");
        data[index].done = $(this).prop("checked");
        // 保存到本地
        saveDate(data);
        // 渲染数据到页面
        load();
    });

    // 四.todolist删除操作
    $("ol,ul").on("click", "a", function() {
        // 获取数据
        var data = getDate();
        // 删除数据
        var index = $(this).siblings("a").attr("id");
        data.splice(index, 1);
        // 存储到本地
        saveDate(data);
        // 重新渲染到页面
        load();
    });

    // 方法1:读取本地存储数据
    function getDate() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            // 本地存储的数据是字符串格式,取出来需要转为对象格式
            return JSON.parse(data);
        } else {
            return [];
        }
    }
    // 方法2:保存本地存储
    function saveDate(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }
})