import './main-nav.styl';

export default {
  template: `
    <div class="main">
      <div class="main-nav">
        <div class="logo">T</div>
        <div class="links">
          <a href="#/tasks/">Tasks</a>
          <a href="#/weather/">Weather</a>
        </div>
      </div>
      <div class="view-container">
        <ui-view></ui-view>
      </div>
    </div>
  `
}
