window.addEventListener('load', function () {
   let mEnu = document.querySelector('.menu')
   let menuItem = document.querySelectorAll('.menu-item')
   //    console.log(menuItem[0].getAttribute('data-index'));
   let menuTitle = document.querySelector('.menuTitle')
   let menuRight = document.querySelector('.menu-right-badge')
   let title = document.querySelector('#title')
   let titleBadge = document.querySelector('#title-badge')
   let oAddTodo = document.getElementById('addTodo')
   let oAddTodoInp = document.getElementById('addTodoInp')
   let oTodosWrapper=document.querySelector('.todosWrapper')
   let oTodoItemWrapper = document.querySelector('.todoItemWrapper')
   let oTodoItem = document.querySelector('.todoItem')
   // let oLabel=this.document.querySelector('.label')
   let oChecked = document.getElementsByName('checked')
   let oLock = document.getElementById('lock')
   let oRemove = document.getElementById('remove')
   let oinput=document.querySelectorAll('input todoItem-input')
// 定义数组用来存放左边的菜单栏
   let todoArr = [
      {
         title:'Jessica',
         isLock:true,
         todolist:[
              {
                 text:'吃饭',
                 isDone:false
              }
         ] 
      },
      {
         title:'Mark',
         isLock:true,
         todolist:[
              {
                 text:'睡觉',
                 isDone:false
              }
         ] 
      },
      {
         title:'newList',
         isLock:false,
         todolist:[
              {
                 text:'打豆豆',
                 isDone:false
              }
         ] 
      }

   ]
    // 页面一加载，就从localStorage获取menu，若menu有数据，就渲染到页面
    if(window.localStorage.getItem('mEnu')){
      todoArr=window.localStorage.getItem(JSON.parse('mEnu'))
      console.log(todoArr);
     todoArr.forEach(function(todoObj){
          creatPage(todoObj.title,isLock,todoObj.todolist,todolist.todotext,isDone)
     })
    }
   

   //  创造页面元素
   function creatPage(eletitle,isLock,eletodolist,eletodotext,isDone){
       let oPage=document.createElement('page')
       console.log(oPage);
       oPage.title.innerHTML=eletitle
       if(isLock){
           oPage.isLock=true
           oPage.disabled=true
       }
      //  oPage.todolist=eletodolist
      //  oPage.todolist.text=eletodotext
       if(isDone){
         oPage.todolist.classList.add(todo-done)
       }
   }

   for (let i = 0; i < menuItem.length; i++) {
      menuItem[i].onclick = function () {
         this.classList.add('menuItem-active')
         creatPage(this.title,this.isLock,this.todolist,this.todotext,this.isDone)
         console.log(menuTitle);
         this.innerHTML = title.innerHTML
         titleBadge.innerHTML = this[menuRight].innerHTML
      }

   }
   // 按下新增键
   oAddTodo.onclick = function () {
      let oList = document.createElement('menu-item')
      oList.innerHTML = 'newList'
      oList.classList.add('menuItem-active')
      mEnu[0].appendChild(oList)
      mEnu.appendChild(oPage)
      creatPage(todoObj.title)
      window.localStorage.setItem('mEnu',JSON.stringify(todoArr))
   }
   // 在输入框按下enter键
   oAddTodoInp.onkeyup = function (e) {
      e = e || window.event
      if (e.key === 'Enter' && this.value) {
           

         let oTodoItem = document.createElement('todoItem')
         let oLabel = document.createElement('label')
         oTodoItemWrapper.appendChild(oTodoItem)
         oTodoItemWrapper.appendChild(oLabel)
         oChecked.innerHTML = '<input type=checkbox>'
         oTodoItem.innerHTML = oChecked.innerHTML + oAddTodoInp.value
         oAddTodoInp.value = ''

      }
     
   }
   // 解锁和开锁
   let lockstate = true;
   // 设置锁的状态，默认情况下是开着，input可输入
   oLock.onclick = function () {
      // 点击锁后关闭锁
      if (!lockstate) {
         oAddTodoInp.disabled = true
         oTodoItemWrapper.disabled = true
      }
   }

   oRemove.onclick = function () {
      oTodosWrapper.remove()
      menuItem.remove()

   }
   // 多选框勾选
   oChecked.onclick=function(){
      if(oChecked.checked=true){
         oinput.classList.add('todo-done')
         titleBadge.innerHTML--
         let oRemove=document.createElement('remove')
         oRemove.innerHTML='<span class=glyphicon glyphicon-trash todoItem-delete></span>'
         oinput.appendChild(oRemove)
         oTodoItem.innerHTML=oinput.value +oRemove 
      }
   }
   
     


})