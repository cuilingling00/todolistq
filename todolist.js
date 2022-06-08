$(function () {
  let todolist = [
    {
      title: "Jessica",
      isLocked: true,
      todos: [
        {
          desc: "吃饭",
          isDone: false,
        },
        {
          desc: "睡觉",
          isDone: false,
        },
        {
          desc: "打豆豆",
          isDone: true,
        },
      ],
    },
    {
      title: "Mark",
      isLocked: false,
      todos: [
        {
          desc: "写代码",
          isDone: false,
        },
        {
          desc: "玩游戏",
          isDone: false,
        },
        {
          desc: "睡觉",
          isDone: false,
        },
      ],
    },
  ];

  // 获取左侧菜单menu的盒子
  let menuBox = document.querySelector(".menu");
  // 获取添加按钮
  let addMenuItemBtn = document.getElementById("addTodo");
  // 获取头部的title
  let headerTitle = document.getElementById("title");
  // 获取头部title的徽标
  let headerBadge = document.getElementById("title-badge");
  // 获取头部的小锁
  let headerLock = document.getElementById("lock");
  // 获取todos的容器
  let todoItemWrapper = document.querySelector(".todoItemWrapper");
  let addTodoInp = document.getElementById("addTodoInp");
  let menuItem = document.querySelectorAll('.menu-item')
  let menuLeftIconlist = document.getElementsByClassName('menu-left-icon')
  let remove = document.getElementById('remove')
  let hEader = document.querySelector('.header')
  let menuTitle = document.querySelectorAll('.menuTitle')
  let addtodo=document.querySelector('.addtodo')

  // 将数据存储在本地，永久保存数据
  if (localStorage.getItem('todolist')) {
    todolist = JSON.parse(localStorage.getItem('todolist'))
  }
  // 定义currentIndex变量，来保存当前被选中的menuItem，默认选中第一个menuItem，所以我们这个值为0
  let currentIndex = localStorage.getItem('currentIndex') || 0;
  // 将函数调用写在前面，防止用到的函数会出现错误
  renderMenuItem();
  renderTodos();


  // 小锁的切换
  $('#lock').on('click', function () {
    if ($(this).hasClass('glyphicon-lock')) {
      $(this).addClass('glyphicon-pencil')
      $(this).removeClass('glyphicon-lock')
      //修改左侧菜单的属性
      todolist[currentIndex].isLocked = false;
      $('#addTodoInp:enabled')
      //  修改menuItem里面的左侧的图标
      $('.menu-left-icon').eq(currentIndex).removeClass('glyphicon-lock')
      $('.menu-left-icon').eq(currentIndex).addClass('glyphicon-pencil')
    }
    else{
      $(this).removeClass('glyphicon-pencil')
      $(this).addClass('glyphicon-lock')
      todolist[currentIndex].isLocked=true;
      $('#addTodoInp:disabled')
      //  修改menuItem里面的左侧的图标
      $('.menu-left-icon').eq(currentIndex).addClass('glyphicon-lock')
      $('.menu-left-icon').eq(currentIndex).removeClass('glyphicon-pencil')
    }
    localStorage.setItem('todolist', JSON.stringify(todolist))
  })

  // 更改右侧标题的值

  let titleBox = document.querySelector(".titleBox")
  let titl = document.querySelector(".title-editer")
  let titleinput = document.getElementById("title-input")
  let cancel = document.getElementById("cancel")

  $('#title').on('click',function () {
    $('#title-input').val(function (i,value) {
         return $(todolist).eq(currentIndex).title
    })
    $('.titleBox').css('display','none')
    $('.title-editer').css('display','block')
    $('#title-input').on('keyup',function (e) {

      if(e.key==='Enter' && $(this).val()){
        $('#title').text($(this).val())
        $(todolist).eq(currentIndex).title=$('#title').text()
        $('.titleBox').css('display','block')
        $('.title-editer').css('display','none')
        $('.titleBox').css('display','flex')
        renderMenuItem()
      }
    })

// 将数据存储在本地
    localStorage.setItem('todolist', JSON.stringify(todolist))
  })
    // 将数据存储在本地
    localStorage.setItem('todolist', JSON.stringify(todolist))


  // 实现新增功能
  addMenuItemBtn.onclick = function () {
    // 1、创建一个描述menuItem的对象，添加到 todolist 数组中
    // 2、修改 currentIndex，让当前选择的是menuItem的当前项
    // 3、创建一个新的menuItem，并且添加到新增按钮的前面
    // 4、重新渲染右侧内容区
    let descmenu = {
      title: "newList",
      isLocked: false,
      todos: []
    }
    todolist.push(descmenu)
    // let newmenuItem=document.createElement('menu-item')
    // menuBox.insertBefore(newmenuItem,addMenuItemBtn)
    // menuItem = document.querySelectorAll('.menu-item');
    // console.log(menuItem);
    // for (let i = 0; i < menuItem.length - 1; i++) {
    //   console.log(i);
    //   menuItem[i].remove();
    // }
    // todoItemWrapper.innerHTML = ''
    // 让鼠标选中新增的项
    currentIndex = todolist.length - 1

    renderTodos()
    renderMenuItem()
    localStorage.setItem('todolist', JSON.stringify(todolist))
  }

  // 点击删除按钮，删除右侧内容区，以及左侧菜单栏的当前项
  remove.onclick = function () {
    // menuItem = document.querySelectorAll('.menu-item');
    // let todoItemWrapper = document.querySelector(".todoItemWrapper");
    // let hEader = document.querySelector('.header')
    // todoItemWrapper.remove();
    // hEader.style.display='none'
    // menuItem[currentIndex].remove()
    // todoItemWrapper.style.display='none'
    todolist.splice(currentIndex, 1)
    if (currentIndex > 0) {
      currentIndex--
    }
    console.log(currentIndex);
    renderMenuItem()
    // 渲染左侧菜单
    renderTodos()
    // 渲染右侧内容区
    localStorage.setItem('todolist', JSON.stringify(todolist))
  }


  // input 框添加enter回车事件，将输入的内容添加到todos
  addTodoInp.onkeyup = function (e) {
    e = e || window.event
    if (e.key == 'Enter' && this.value) {
      let todoObj = {
        desc: this.value,
        isDone: false,
      }

      todolist[currentIndex].todos.push(todoObj)
      console.log(todolist);
      // 一旦向todolist添加对象，就要先清空之前存在的内容，在重新渲染左右侧页面
      todoItemWrapper.innerHTML = ''
      // 更新左侧菜单栏和右侧内容区
      renderMenuItem()
      renderTodos()
      // 清空输入框的内容
      this.value = ''
      //   let oinp = document.createElement('input')
      //   oinp.innerHTML = todoObj.todos.desc
      //   oinp.type = 'text'
      //  let oChec=document.createElement('input')
      //  oChec.type='checkbox'
      //  oChec.checked=todos.isDone.value

      //  创建一个input框，添加到页面中

      // 创建元素，添加到todolist 
      // let oDiv=document.createElement('div')
      // oDiv.classList.add('todoItem')
    }
    localStorage.setItem('todolist', JSON.stringify(todolist))

  }

  // 根据todolist的数据来生成menuItem
  function renderMenuItem() {
    // 先清空menuItem
    $('.menu-item').each(function (idx, value) {
      $('.menu-item').detach()
      $('.menu').append($('#addTodoInp'))
    })
    $(todolist).each(function (ind, obj) {
      console.log(obj);
      return
      // let div = $('<div></div>')
      // div.addClass(('menu-item'))
      // if ($('idx') == $(todolist).eq(currentIndex)) {
      //   div.addClass('menuItem-active')
      // }
      // // 给menuItemDiv设置自定义属性
      // div.attr('data-index', 'idx');

      // // 创建menuItem左侧小图标
      // let span = $('<span></span>')
      // span.addClass('menu-left-icon')
      // // 根据当前menuItem是否锁定状态，来动态添加Icon图标
      // if ($('obj').isLocked) {
      //   span.addClass('glyphicon-lock')
      // } else {
      //   span.addClass('glyphicon-pencil')
      // }
      // // 创建menuItem 的标题标签
      // let menutite = $('<span></span>')
      // menutite.addClass('menuTitle')
      // // 设置标题
      // menutite.text($('obj').title)
      // // 创建徽标标签
      // let menubage = $('<span></span>')
      // menubage.addClass('badge', 'menu-right-badge')
      // if ($('idx') == $(todolist).eq(currentIndex)) {
      //   menubage.addClass(('active-badge'))
      // }
      // // 统计徽标的数字
      // let noDoneArr = $('obj').$('todos').filter(function (idx, item) {
      //   return item.isDone == false;
      // })
      // menubage.text(noDoneArr.length);
      // // 给每一个 menuItemDiv 绑定点击事件，点击的时候来切换右侧的内容
      // $('div').on('click', function () {
      //   $('todolist').eq(currentIndex) = $(this).attr('data-index')
      //   // 将currentIndex保存在localStorage,刷新页面时保持该页面
      //   localStorage.setItem('currentIndex', currentIndex)
      // })
      // // 切换menuItem右侧的内容
      // let menuitem = $('.menu-item')
      // $('.menu-item').each(function (idx, value) {
      //   $('.menu-item').removeClass('menuItem-active')
      // })
      // $(this).addClass('menuItem-active')
      // // 切换徽标的被激活的样式
      // let menuBadgeList = $('.menu-right-badge')
      // menuBadgeList.each(function (index, badge) {
      //   badge.removeClass('active-badge')
      // })
      // menuBadgeList.eq(currentIndex).addClass('active-badge')
      // renderTodos();
      // $('.todoItemWrapper').text('')
      // creatTodos()
      // let menuItemActiveBadge = $('active-badge').eq(1)
      // // 修改右侧头部的标题
      // $('#title').text($(todolist).eq(currentIndex).title)
      // // 修改右侧头部的徽标数值
      // $('#title-badge').text(menuItemActiveBadge.text())
      // // // 动态渲染头部小锁的图标
      // if ($(todolist).eq(currentIndex).isLocked) {
      //   $('#lock').addClass('glyphicon-lock')
      //   $('#lock').removeClass('glyphicon-pencil')
      //   $('#addTodoInp').disabled = true;

      // } else {
      //   $('#lock').addClass('glyphicon-pencil')
      //   $('#lock').removeClass('glyphicon-lock')
      //   $('#addTodoInp').disabled = false;
      // }
      // // 拼装menuItem
      // $('div').append('.menu-left-icon')
      // $('div').append('.menuTitle')
      // $('div').append('menubage')
      // // 将menuItemDiv插入到新增按钮的前面
      // $('.menu').prepend('div')
      // $('.menu').append('#addTodo')
    })
    localStorage.setItem('todolist',JSON.stringify(todolist))
  }

  // 根据todolist的数据来生成右侧的todo
  function renderTodos() {
    // 没有数据时，让右侧内容区的头部和内容隐藏
    if (todolist.length <= 0) {
      $('.header').css('display','none')
      $('.todoItemWrapper').css('display','none')
      return;
    }
    else {
      $('.header').css('display','block')
      $('.todoItemWrapper').css('display','block')
    }
    // 获取左侧菜单被激活的徽标
   let menuItemActiveBadge= $('.active-badge').eq(0)

    // 修改右侧头部的标题
    $('#title').text($(todolist).eq(currentIndex).title)
    // 修改右侧头部的徽标数值
    $('#title-badge').text(menuItemActiveBadge.text())
    // 动态渲染头部小锁的图标
    if (todolist[currentIndex].isLocked) {
      $('#lock').addClass('glyphicon-lock')
      $('#lock').removeClass('glyphicon-pencil')
      $('#addTodoInp:disabled')

    }
    else {
      $('#lock').addClass('glyphicon-pencil')
      $('#lock').removeClass('glyphicon-lock')
      $('#addTodoInp:enabled')
    }
    // 先将 todoItemWrapper 里面的todoItem全部移除掉
    $('.todoItemWrapper').text('')
    // 循环生成todos
    creatTodos();
    localStorage.setItem('todolist', JSON.stringify(todolist))
  }

  // 判断多选框的选中状态，实现垃圾桶元素的添加和删除此行
  // 创建todos，并添加到页面
  function creatTodos() {
    todolist[currentIndex].todos.each(function (todoObj) {
      console.log('xxx:'todolist[currentIndex].todos)

      // 创建todoItem这个最外层的div
      let todoItemDiv = $('<div></div>')
      todoItemDiv.addClass('todoItem')
      // 创建label标签
      let olabel=$('<label></label>')
      olabel.addClass('label')
      // 创建 checkbox 多选框
      let oCheckbox=$('<input></input>')
      oCheckbox.css('type','checkbox')
      oCheckbox.on('change',function () {
        if ($('oCheckbox:checked')) {
          $('.todoItem-input:disabled')
          $('.todoItem-delete').css('display', 'block')
          $('.todoItem-input').addClass('todo-done')
          $('todoObj').isDone = true
          // 点击每行，删除此行
          let todoItemdele = $('.todoItem-delete')
          todoItemdele.each(function (idx1, item1) {
            item1.on('click', function () {
              $(this).parent().remove()
              $(todolist).eq(currentIndex).todos.splice(idx1, 1)
            })
          })
        } else {
          $('.todoItem-input:enabled')
          $('.todoItem-delete').css('display', 'none')
          $('.todoItem-input').removeClass('todo-done')
          $('todoObj').isDone = false
        }
        // 获取徽标的数字
        let noDoneArr = $(todolist).eq(currentIndex).todos.filter(function (tofoObj) {
          return tofoObj.isDone == false;
        });
        // 给徽标设置给头部
        $('#title-badge').text('noDoneArr.length')
        // 获取左侧的徽标并把设置给对应的徽标
        let menuRight = $('.menu-right-badge')
        menuRight.eq(currentIndex).text('noDoneArr.length')

      })
      if(todoObj.isDone){
        oCheckbox.checked = true;
      }
      else{
        oCheckbox.checked = false;
      }
      // 创建输入框
      let oInput=$('<input></input>')
      oInput.css('type','text')
      oInput.addClass('input',"todoItem-input")
      if(todoObj.isDone){
        oInput.addClass('todo-done')
        $('input:disabled')
      }
      oInput.val($('todoObj').desc)
      // 创建删除按钮
      let deleteBtn=$('<span></span>')
      deleteBtn.addClass("glyphicon", "glyphicon-trash", "todoItem-delete")
      if(todoObj.isDone){
        deleteBtn.css('display','block')
      }else{
        deleteBtn.css('display','none')
      }
      // 判断锁定状态
      if($(todolist).eq(currentIndex).isLocked){
        $('oCheckbox:disabled')
        $('oInput:disabled')
         deleteBtn.css('display','none')
      }
      // 拼接todoItem
      olabel.append('oCheckbox')
      todoItemDiv.append(' olabel')
      todoItemDiv.append('oInput')
      todoItemDiv.append('deleteBtn')
      // 将 todoItemDiv 添加到 todoItemWrapper
      todoItemWrapper.append('todoItemDiv')
    })
    localStorage.setItem('todolist', JSON.stringify(todolist))
  }
})