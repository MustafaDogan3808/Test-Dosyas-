const inputBox = document.getElementById("input-box");  //girdi olarak yazdigimiz degeri alir
let todos = JSON.parse(localStorage.getItem("todos")) || [];

function PageLoaded() {
    //bu satir sayesinde her yeni gorev eklendiginde ustune tekrar tekrar eklenmesi engellenir
    document.querySelectorAll('.todos').forEach(todoElement => todoElement.remove());
    
    todos.forEach(todo => {
        let a = document.createElement("div")
        let b = document.createElement("div")
        let c = document.createElement("div")

        a.className = "todos"
        a.dataset.id = todo.id;
        document.body.appendChild(a)

        b.className = "todo-text"
        a.appendChild(b)

        c.className = "todo-delete"
        c.innerHTML = "x"
        a.appendChild(c)
        if (todo.completed) {
            b.innerHTML = "✓ " + todo.text;
            a.classList.add("completed");   //eger complated degeri true ise onune tik getiriyoruz
        }
        else {
            b.innerHTML = "☐ " + todo.text;
        }

    });
}

function addTask() {
    const text = inputBox.value.trim();// sagdan soldan fazla bosluklari keser
    if (text === '') { //eger bos todo eklenmeye calisilirsa 
        alert("Bos todo ekleyemezsiniz");
        return;
    }
    const newTodo = {
        id: Date.now(), // Benzersiz bir kimlik
        text: text,
        completed: false // Yeni görevler her zaman tamamlanmamış başlar
    };


    AddTodoToStorage(newTodo)
    PageLoaded()
    inputBox.value = ""
    // ekleye tiklandiginda icini bosaltir
}
document.body.addEventListener("click", function (e) { //body de herhangi bir yere tıklandığında içeri gir
    const todoElement = e.target.closest(".todos");     // Tıklanan elementin bir todo'ya ait olup olmadığını .closest() ile anlıyoruz.
    if (!todoElement) {
        return; // Eğer bir todo içinde değilse, hiçbir şey yapma.
    }
    // data-id'den görevin benzersiz kimliğini alıyoruz.
    const todoId = Number(todoElement.dataset.id);

    if (e.target.classList.contains("todo-text")) { // Tıklanan yer görev metni ise
        const foundTodo = todos.find(todo => todo.id === todoId);// Dizideki doğru todo objesini ID ile bul.
        if (foundTodo) {
            foundTodo.completed = !foundTodo.completed;// 'completed' durumunu tersine çevir (true ise false, false ise true yap).

            localStorage.setItem("todos", JSON.stringify(todos));// Dizinin güncel halini localStorage'a kaydet.

            PageLoaded();// Ekranı güncelle.
        }
    }
    if (e.target.classList.contains("todo-delete")) { //eger tiklanan yer silme butonu ise
        RemoveTodoToStorage(todoId);// Silme fonksiyonunu ID ile çağır.
        PageLoaded();// Ekranı güncelle.
    }

});
function RemoveTodoToStorage(removeId) {    //silinecek objenin id sini aliyo
    // ID'si uyuşmayanları tutarak yeni bir dizi oluşturuyoruz, yani ID'si uyuşanı silmiş oluyoruz.
    todos = todos.filter(todo => todo.id !== removeId);
    localStorage.setItem("todos", JSON.stringify(todos));
}
// Fonksiyon artık metin yerine bütün bir todo objesi alıyor.
function AddTodoToStorage(newTodo) {
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}
document.addEventListener("DOMContentLoaded",PageLoaded)

