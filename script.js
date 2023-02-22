const su_Hazne_time = 30;
const kahve_Hazne_time = 60;
const sut_Hazne_time = 32;
var su_Hazne_max = 1000;
var kahve_Hazne_max = 1000;
var sut_Hazne_max = 1000;
var IsSatinAl = false;
function suekle(miktar) {
  return (su_Hazne_max += miktar);
}
let value_Su = document.querySelector("#addtextsu");
function kahveekle(miktar) {
  return (kahve_Hazne_max += miktar);
}
let value_Kahve = document.querySelector("#addtextkahve");
function sutekle(miktar) {
  return (sut_Hazne_max += miktar);
}
let value_Sut = document.querySelector("#addtextsut");

function Menu(urunid, urunadi, urunsu, urunkahve, urunsut, urunurl) {
  this.urunid = urunid;
  this.urunadi = urunadi;
  this.urunsu = urunsu;
  this.urunkahve = urunkahve;
  this.urunsut = urunsut;
  this.urunurl = urunurl;
}

let menu = [
  new Menu(0, "Espresso", 250, 50, 0, "/images/espresso.webp"),
  new Menu(1, "Latte", 150, 50, 100, "/images/latte.jpeg"),
  new Menu(2, "Sıcak Su", 300, 0, 0, "/images/hotwater.jpeg"),
  new Menu(3, "Filtre Kahve", 200, 100, 0, "/images/filtercoffee.jpeg"),
  new Menu(4,"Sütlü Filtre Kahve",200,50,50,"/images/filtercoffeewithmilk.jpeg")
];

function menuYazdirma(menu) {
  for (let i = 0; i < menu.length; i++) {
    console.log(menu[i].urunadi);
  }
}

let ul = document.getElementById("menu-list");
menu.map((item, i, v) => {
  let li = `<li class="menu list-group-item">
                <input id="${item.urunid} " data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" class="buycoffee" style="border-radius: 5%;" type="image" src="${item.urunurl}" value="submit" width="160px" height="140px">
                <span>${item.urunadi}</span>
              `;
  ul.insertAdjacentHTML("beforeend", li);
});
let ul2 = document.getElementById("info-list");
let li = `<li class="info list-group-item">
            <span>Haznedeki Su Miktarı: ${su_Hazne_max} ml</span>
        </li>
        <li class="info list-group-item">
            <span>Haznedeki Kahve Miktarı: ${kahve_Hazne_max} gram</span>
        </li>
        <li class="info list-group-item">
            <span>Haznedeki Sut Miktarı: ${sut_Hazne_max} ml</span>
        </li>`;
ul2.insertAdjacentHTML("beforeend", li);
function hazneGuncelleme() {
  let ul2 = document.getElementById("info-list");
  let li = `<li class="info list-group-item">
            <span>Haznedeki Su Miktarı: ${su_Hazne_max} ml</span>
        </li>
        <li class="info list-group-item">
            <span>Haznedeki Kahve Miktarı: ${kahve_Hazne_max} gram</span>
        </li>
        <li class="info list-group-item">
            <span>Haznedeki Sut Miktarı: ${sut_Hazne_max} ml</span>
        </li>`;
  ul2.innerHTML = li;
}
function update_Summary() {
  let orderpart = document.querySelector(".summaryofOrder");
  let ordertext = `<div class="card-body">
        <h5 style="text-align: center;" class="card-title">Siparişiniz Bekleniyor..</h5>
        <p class="card-text">Menü üzerinden bir kahve sipariş edebilirsiniz. Eğer kahveniz için yeteri kadar malzeme yok ise uyarılacaksınız.</p>
        </div>`;
  orderpart.innerHTML = ordertext;
}
function info_Order() {
  let infoOrder = document.querySelector(".summaryOfOrder");
  let infoTextOrder = ` 
        
        <div class="card-body">
            <h5 style="text-align: center;" class="card-title">Menüyü İnceleyin..</h5>
            <p class="card-text">Menü üzerinden bir kahve sipariş edebilirsiniz. Eğer kahveniz için yeteri kadar malzeme yok ise uyarılacaksınız.</p>
        </div>
        `;
  infoOrder.innerHTML = infoTextOrder;
  IsSatinAl = false;
}

function processOrder(x, item) {
  let gettingOrder = document.querySelector(".summaryOfOrder");
  let settingOrder = `<img class="card-img-top" style="padding: 0.4rem; border-radius: 10%;" width="240px" height="210px" src="${item.urunurl}" alt="Card image cap">
        <div class="card-body">
        <h5 style="text-align: center;" class="card-title">"${item.urunadi}" Siparişiniz Hazırlanıyor..</h5>
        <p class="card-text">Siparişiniz hazırlanıyor. Birazdan hazır olacaktır.</p>
        <p style="text-align: center; margin; 0;" id="${item.urunid}"></p>
        <span>${x} sn kaldi</span>
        `;
  gettingOrder.innerHTML = settingOrder;
}

function completed_Order(item) {
  let completeOrder = document.querySelector(".summaryOfOrder");
  let completeOrdertext = `<img class="card-img-top" style="padding: 0.4rem; border-radius: 10%;" width="240px" height="210px" src="${item.urunurl}" alt="Card image cap">
    <div class="card-body">
    <h5 style="text-align: center;" class="card-title">"${item.urunadi}" Siparişiniz Hazırlandi  <i class="fas fa-check"></i></h5>
    <p class="card-text">Siparişinizi tepsiden alabilirsiniz.</p>
    `;
  completeOrder.innerHTML = completeOrdertext;
  setTimeout("info_Order()", 2000);
}

function get_Order(item) {
  let x = Math.round(
    (item.urunsu / 1000) * su_Hazne_time +
      (item.urunkahve / 1000) * kahve_Hazne_time +
      (item.urunsut / 1000) * sut_Hazne_time
  );
  const timer = setInterval(() => {
    if (x == 0) {
      clearInterval(timer);
      completed_Order(item);
    } else {
      processOrder(x, item);
      --x;
    }
  }, 1000);
}
function clear_Input(target) {
  target.value = "";
}
document.querySelector(".addsu").addEventListener("click", function () {
  suekle(Number(value_Su.value));
  clear_Input(value_Su);
  hazneGuncelleme();
});
document.querySelector(".addkahve").addEventListener("click", function () {
  kahveekle(Number(value_Kahve.value));
  clear_Input(value_Kahve);
  hazneGuncelleme();
});
document.querySelector(".addsut").addEventListener("click", function () {
  sutekle(Number(value_Sut.value));
  clear_Input(value_Sut);
  hazneGuncelleme();
});

function satinal(urun) {
  su_Hazne_max -= urun.urunsu;
  kahve_Hazne_max -= urun.urunkahve;
  sut_Hazne_max -= urun.urunsut;
}
function validateBuy(urun) {
  var success = true;
  var message = "";
  var whichone = "";
  if (su_Hazne_max == 0) {
    if (success != false) {
      success = false;
    }
    message += "Makinede su yok\n";
    whichone += "1";
  } else if (su_Hazne_max - urun.urunsu < 0) {
    if (success != false) {
      success = false;
    }
    message += "Makinede yeteri kadar su yok\n";
    whichone += "1";
  }
  if (kahve_Hazne_max == 0) {
    if (success != false) {
      success = false;
    }
    message += "Makinede kahve yok\n";
    whichone += "2";
  } else if (kahve_Hazne_max - urun.urunkahve < 0) {
    if (success != false) {
      success = false;
    }
    message += "Makinede yeteri kadar kahve yok\n";
    whichone += "2";
  }
  if (sut_Hazne_max == 0) {
    if (success != false) {
      success = false;
    }
    message += "Makinede sut yok\n";
    whichone += "3";
  } else if (sut_Hazne_max - urun.urunsut < 0) {
    if (success != false) {
      success = false;
    }
    message += "Makinede yeteri kadar sut yok\n";
    whichone += "3";
  }
  return { isSuccess: success, result: message, whichoneresult: whichone };
}
// function sayacekleme(idornek){
//     var addtimesayac = document.createElement("p");
//     addtimesayac.setAttribute("id", idornek)
//     document.querySelector("#summaryOfOrder").appendChild(addtimesayac);
// }

// Menudeki urunlere tikladigim zamanda olusacak etkiler.

let ker = document.querySelectorAll(".buycoffee");
ker.forEach((item) => {
  document.getElementById(item.id).addEventListener("click", function () {
    if (!IsSatinAl) {
      let urun = menu.find((x) => x.urunid == Number(item.id));
      let validate = validateBuy(urun);
      if (validate.whichoneresult == "") {
        // document.getElementsByClassName("addsupart")[0].classList.remove("active");
        // document.getElementsByClassName("addkahvepart")[0].classList.remove("active");
        // document.getElementsByClassName("addsutpart")[0].classList.remove("active");
        if (validate.isSuccess) {
          get_Order(urun, "espressotime");
          satinal(urun);
          hazneGuncelleme();
        } else {
          alert(validate.result);
        }
        IsSatinAl = true;
      } else {
        isAddMaterial = true;
        if (validate.whichoneresult.includes("1")) {
          if (isAddMaterial != false) {
            isAddMaterial = false;
          }
          document
            .getElementsByClassName("addsupart")[0]
            .classList.add("active");
        }
        if (validate.whichoneresult.includes("2")) {
          if (isAddMaterial != false) {
            isAddMaterial = false;
          }
          document
            .getElementsByClassName("addkahvepart")[0]
            .classList.add("active");
        }
        if (validate.whichoneresult.includes("3")) {
          if (isAddMaterial != false) {
            isAddMaterial = false;
          }
          document
            .getElementsByClassName("addsutpart")[0]
            .classList.add("active");
        }
        if (validate.isSuccess) {
          get_Order(urun, "espressotime");
          satinal(urun);
          hazneGuncelleme();
        } else {
          alert(validate.result);
        }
      }
    } else {
    }
  });
});