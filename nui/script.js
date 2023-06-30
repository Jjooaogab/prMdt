$(function () {

  let name;
  let firstname;
  let org;

  function display(bool) {
    if (bool) {
      $("#container").show();
      $("#home-page").show()
      $(".topSearch").hide()
    } else {
      $("#container").hide();
    }
  }

  display(true);

  $("#close").click(function(data){
    $.post("http://prMdt/exit", JSON.stringify({}));
  })

  document.onkeyup = function (data) {
    if (data.which == 27) {
      $.post("http://prMdt/exit", JSON.stringify({}));
    }
  }

  $(".iconStyle").click(function() {
    $(".iconStyle").removeClass("active");
    $(this).addClass("active");

    let pageId = $(this).attr("id");

    $(".page").hide()
    
    $("#" + pageId + "-page").fadeIn();
  });

  $(".btnIS").click(function() {
    $(".btnIS").removeClass("btnActive");
    $(this).addClass("btnActive")
  })

  $("home").click(function() {
    $("#pageHome").show()
    $("home").addClass("active")
  })

  window.addEventListener("message", function (e) {
    let item = e.data;

    if (item.type === "ui") {
      if (item.status === true) {
        display(true)
      } else {
        display(false)
      }
    }

    if (item.id != undefined) {
      let passporte = item.id
      document.getElementById("passportOfficial").innerHTML = "Passporte: " + passporte
    }

    if (item.name != undefined) {
      nome = item.name
      document.getElementById("spanNameOfficial").innerHTML = nome
    }

    if (item.firstname != undefined) {
      sobrenome = item.firstname
      document.getElementById("spanLastNameOfficial").innerHTML = sobrenome
    }

    if (item.org != undefined) {
      office = item.org
      document.getElementById("spanOfficiePolice").innerHTML = office
    }

    if (item.count != undefined) {
      let countP = item.count
      document.getElementById("populationTotal").innerHTML = countP
    }

    if (item.countO != undefined) {
      let countO = item.countO
      document.getElementById("policeRegistred").innerHTML = countO
    }
  })

  const divNW = $("#notWarnings");
  const divAll = $("#muralWarnings");
  const divWarning = $("#warningsDiv")

  $("#confirmW").click(function (name, firstname, org) {

    let value = $("#inputWarning").val();
    let img = "https://cdn.discordapp.com/attachments/966571671140069406/983207620934512650/unknown.png"

    divNW.remove();

    let divItem = $("<div>").addClass("warningsDiv") // Create div with class warningsDiv

    let itensW = $("<div>").addClass("itemW") // Container Div

      let imgW = $("<div>").addClass("imgW") // Div container image office
        let imgSrcW = $("<img>").attr("src", img).addClass("imgSrcW")

      let infosW = $("<div>").addClass("infosW") // Div container info office
        let span1 = $("<span>").text(nome + " " + sobrenome ).addClass("nameW")
        let span2 =  $("<span>").text(office).addClass("orgW")

      let contentWarning = $("<div>").addClass("contentWarning") // Div container content warning
        let valueWarning = $("<p>").text(value).addClass("valueWarning")

    imgW.append(imgSrcW)
    infosW.append(span1, span2)
    contentWarning.append(valueWarning)

    itensW.append(imgW, infosW, contentWarning)
    divWarning.append(itensW)
    divAll.append(divWarning)
    $("#inputWarning").val("");
  })

});

// Day for home
const date = new Date()
const day = String(date.getDate()).padStart(2, "0");
const month = date.getMonth();

const monthNames = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
]
const monthString = monthNames[month];

const valueDay = "Hoje é dia " + day + " de " + monthString;
document.getElementById("spanDay").textContent = valueDay;

// Button Service

const bes = document.getElementById("buttonContent");
let stateButton = false;

function clickToEnterService() {
  if (stateButton) {
    bes.textContent = "Entrar em serviço"
    // bes.classList.remove("exitStyle")
  } else {
    bes.textContent = "Sair do serviço"
    // bes.classList.add("exitStyle")
  }
  stateButton = !stateButton;
}

// Graph
// const ctx = document.getElementById('myChart').getContext('2d');
// const values = [12, 19, 3, 5, 2, 3, 9];

// const myChart = new Chart(ctx, {
//   type: 'line',
//   data: {
//     labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
//     datasets: [{
//       label: 'Presos',
//       data: values,
//       backgroundColor: 'rgba(0, 123, 255, 0.5)',
//       borderColor: 'rgba(0, 123, 255, 1)',
//       borderWidth: 1,
//       borderCapStyle: 'round',
//       tension: 0.3
//     }]
//   },
//   options: {
//     scales: {
//       y: {
//         beginAtZero: true // Começa o eixo y no valor zero
//       }
//     }
//   }
// })

// OpenModal 
function openModal() {
  document.getElementById("myModal").style.display = "flex";
}

// Função para fechar o modal
function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

