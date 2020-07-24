'use strict'

// ドロワーボタン開閉
const button = document.querySelector('.zdo_drawer_button');
let drawer = document.getElementById('drawer');
let body = document.getElementById('home');
button.addEventListener('click', () => {
  button.classList.toggle('active');
  drawer.classList.toggle('drawer');
  body.classList.toggle('noscroll');
});


// ヘッダースクロール時background-color出現
window.addEventListener("scroll", function () {
  let headerElement = document.getElementById("header"); // `#header`セレクタを取得
  let rect = headerElement.getBoundingClientRect(); //
  let y = rect.top + window.pageYOffset; // Y方向 (縦)にスクロール量を取得（pageYOffset：windowオブジェクト。現在表示位置のY座標を取得）
  if (y > 60) { // 変数yの値が0よりも
    headerElement.classList.add('scrollColor'); // 大きければscrollColorセレクタを追加する
  } else {
    headerElement.classList.remove('scrollColor'); // そうでなければscrollColorセレクタを削除する
  }
});


// ヘッダー点灯
window.addEventListener('scroll', function () {

  const timing = 80; //変化するタイミングを微調整する

  const navHome = document.getElementById('navHome');
  const navAbout = document.getElementById('navAbout');
  const navWork = document.getElementById('navWorks');
  const navService = document.getElementById('navService');
  const navContact = document.getElementById('navContact');

  const trigger1 = document.getElementById('title');
  const trigger2 = document.getElementById('about');
  const trigger3 = document.getElementById('work');
  const trigger4 = document.getElementById('service');
  const trigger5 = document.getElementById('contact');

  const trigger1Y = trigger1.getBoundingClientRect().top; // ウィンドウ上からの要素の位置
  const trigger2Y = trigger2.getBoundingClientRect().top;
  const trigger3Y = trigger3.getBoundingClientRect().top;
  const trigger4Y = trigger4.getBoundingClientRect().top;
  const trigger5Y = trigger5.getBoundingClientRect().top;

  if (trigger2Y - timing > 0 && 0 >= trigger1Y - timing) {
    navHome.classList.add('navItemColor');
    navAbout.classList.remove('navItemColor');
    navWork.classList.remove('navItemColor');
    navService.classList.remove('navItemColor');
    navContact.classList.remove('navItemColor');
  } else if (trigger3Y - timing > 0 && 0 >= trigger2Y - timing) {
    navAbout.classList.add('navItemColor');
    navHome.classList.remove('navItemColor');
    navWork.classList.remove('navItemColor');
    navService.classList.remove('navItemColor');
    navContact.classList.remove('navItemColor');
  } else if (trigger4Y - timing > 0 && 0 >= trigger3Y - timing) {
    navWork.classList.add('navItemColor');
    navHome.classList.remove('navItemColor');
    navAbout.classList.remove('navItemColor');
    navService.classList.remove('navItemColor');
    navContact.classList.remove('navItemColor');
  } else if (trigger5Y - timing > 0 && 0 >= trigger4Y - timing) {
    navService.classList.add('navItemColor');
    navHome.classList.remove('navItemColor');
    navAbout.classList.remove('navItemColor');
    navWork.classList.remove('navItemColor');
    navContact.classList.remove('navItemColor');
  } else if (trigger5Y - timing <= 0) {
    navContact.classList.add('navItemColor');
    navHome.classList.remove('navItemColor');
    navAbout.classList.remove('navItemColor');
    navWork.classList.remove('navItemColor');
    navService.classList.remove('navItemColor');
  } else {
    navHome.classList.remove('navItemColor');
    navAbout.classList.remove('navItemColor');
    navWork.classList.remove('navItemColor');
    navService.classList.remove('navItemColor');
    navContact.classList.remove('navItemColor');
  }
});

// ページ内リンクスクロール
// 関数定義 -------------------------
const smoothScroll = () => {
  let links = document.querySelectorAll('a[href^="#"]');
  const speed = 500;          // スクロールスピード
  const divisor = 100;        // 分割数
  const tolerance = 5;        // 許容誤差
  const headerHeight = 60;     // 固定ヘッダーがある場合はその高さ分ずらす
  const interval = speed / divisor;
  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', (e) => {
      e.preventDefault();
      let nowY = window.pageYOffset;
      const href = e.currentTarget.getAttribute('href');
      const target = document.querySelector(href);
      if (target != null) {
        const targetRectTop = target.getBoundingClientRect().top;
        const targetY = targetRectTop + nowY - headerHeight;
        const minY = Math.abs((targetY - nowY) / divisor);
        doScroll(minY, nowY, targetY, tolerance, interval);
      }
    });
  }
};

const doScroll = (minY, nowY, targetY, tolerance, interval) => {
  let toY;
  if (targetY < nowY) {
    toY = nowY - minY;
  } else {
    toY = nowY + minY;
  }
  window.scrollTo(0, toY);
  if (targetY - tolerance > toY || toY > targetY + tolerance) {
    window.setTimeout(doScroll, interval, minY, toY, targetY, tolerance, interval);
  } else {
    return false;
  }
};

// 絞り込み検索
let searchItem = '.search_item';   // 絞り込む項目を選択するエリア
let listItem = '.list_item';       // 絞り込み対象のアイテム
let hideClass = 'is-hide';         // 絞り込み対象外の場合に付与されるclass名
let activeClass = 'is-active';     // 選択中のグループに付与されるclass名

$(function () {
  // 絞り込みを変更した時
  $(searchItem).on('click', function () {
    $(searchItem).removeClass(activeClass);
    let group = $(this).addClass(activeClass).data('group');
    search_filter(group);
  });
});

// 下線アニメーション
$(window).on('scroll', function () {
  $(".JS_ScrollAnimationItem").each(function () {
    let position = $(this).offset().top;
    let scroll = $(window).scrollTop();
    let windowHeight = $(window).height();
    if (scroll > position - windowHeight) {
      $(this).addClass('isActive');
    }
  });
});

/**
 * リストの絞り込みを行う
 * @param {String} group data属性の値
 */
function search_filter(group) {
  // 非表示状態を解除
  $(listItem).removeClass(hideClass);
  // 値が空の場合はすべて表示
  if (group === '') {
    return;
  }
  // リスト内の各アイテムをチェック
  for (let i = 0; i < $(listItem).length; i++) {
    // アイテムに設定している項目を取得
    let itemData = $(listItem).eq(i).data('group');
    // 絞り込み対象かどうかを調べる
    if (itemData !== group) {
      $(listItem).eq(i).addClass(hideClass);
    }
  }
}

//スクロールトップボタン
//スクロール量を取得する関数
function getScrolled() {
  return (window.pageYOffset !== undefined) ? window.pageYOffset : document.documentElement.scrollTop;
}

//トップに戻るボタンの要素を取得
let topButton = document.getElementById('scrollTop');

//ボタンの表示・非表示
window.onscroll = function () {
  (getScrolled() > 500) ? topButton.classList.add('is-fadein') : topButton.classList.remove('is-fadein');
};

//トップに移動する関数
function scrollToTop() {
  let scrolled = getScrolled();
  window.scrollTo(0, Math.floor(scrolled / 2));
  if (scrolled > 0) {
    window.setTimeout(scrollToTop, 60);
  }
};

// スクロールトップ
topButton.onclick = function () {
  scrollToTop();
};
