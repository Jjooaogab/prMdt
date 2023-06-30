$(function () {

  var name;
  var org;

  function display(bool) {
    if (bool) {
      $("#container").show();
      $("#pageHome").show()
    } else {
      $("#container").hide();
    }
  }

  display(true);

  document.onkeyup = function (data) {
    if (data.which == 27) {
      $.post("http://prMdt/exit", JSON.stringify({}));
    }
  }

  window.addEventListener("message", function (e) {
    var item = e.data;

    if (item.type === "ui") {
      if (item.status === true) {
        display(true)
      } else {
        display(false)
      }
    }

    if (item.id != undefined) {
      var passporte = item.id
      document.getElementById("passportOfficial").innerHTML = "Passporte: " + passporte
    }

    if (item.name != undefined) {
      nome = item.name
      document.getElementById("spanNameOfficial").innerHTML = nome
    }

    if (item.firstname != undefined) {
      var firstname = item.firstname
      document.getElementById("spanLastNameOfficial").innerHTML = firstname
    }

    if (item.org != undefined) {
      office = item.org
      document.getElementById("spanOfficiePolice").innerHTML = office
    }

    if (item.count != undefined) {
      var countP = item.count
      document.getElementById("populationTotal").innerHTML = countP
    }

    if (item.countO != undefined){
      var countO = item.countO
      document.getElementById("policeRegistred").innerHTML = countO
    }
  })

  const divNW = $("#notWarnings");
  const divAll = $("#muralWarnings");

  $("#confirmW").click(function(name, org){

    var value = $("#inputWarning").val();

    divNW.remove();

    var divItem = $("<div>").addClass("warningsDiv")

    var pValue = $("<p>").text(value).addClass("valueW")
    var pNome = $("<p>").text(nome).addClass("nameW")
    var pOrg = $("<p>").text(office).addClass("orgW")

    divItem.append(pValue, pNome, pOrg)
    divAll.append(divItem)
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
const ctx = document.getElementById('myChart').getContext('2d');
const values = [12, 19, 3, 5, 2, 3, 9];

const myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
    datasets: [{
      label: 'Presos',
      data: values,
      backgroundColor: 'rgba(0, 123, 255, 0.5)',
      borderColor: 'rgba(0, 123, 255, 1)',
      borderWidth: 1,
      borderCapStyle: 'round',
      tension: 0.3
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true // Começa o eixo y no valor zero
      }
    }
  }
})

// OpenModal 
const buttonW = document.getElementById("buttonNewWarning");
const closeW = document.getElementById("closeW");

buttonW.addEventListener("click", function() {
  document.getElementById("modalContainer").classList.add("show"); 
});

closeW.addEventListener("click", function() {
  document.getElementById("modalContainer").classList.remove("show"); 
})

//Crud Warning
