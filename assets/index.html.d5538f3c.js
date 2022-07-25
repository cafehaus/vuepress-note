import{e as n}from"./app.56a26a36.js";import{_ as a}from"./plugin-vue_export-helper.21dcd24c.js";const s={},p=n(`<h2 id="\u524D\u7AEF\u5E38\u7528css\u6837\u5F0F\u4EE3\u7801" tabindex="-1"><a class="header-anchor" href="#\u524D\u7AEF\u5E38\u7528css\u6837\u5F0F\u4EE3\u7801" aria-hidden="true">#</a> \u524D\u7AEF\u5E38\u7528css\u6837\u5F0F\u4EE3\u7801</h2><h3 id="radial-gradient-\u5F84\u5411\u6E10\u53D8\u53BB\u505A\u5916\u5706\u89D2" tabindex="-1"><a class="header-anchor" href="#radial-gradient-\u5F84\u5411\u6E10\u53D8\u53BB\u505A\u5916\u5706\u89D2" aria-hidden="true">#</a> radial-gradient \u5F84\u5411\u6E10\u53D8\u53BB\u505A\u5916\u5706\u89D2</h3><p>\u9002\u5408\u9700\u8981\u5916\u5706\u89D2\u7684\u5404\u79CD\u80CC\u666F\u56FE\u6807</p><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>tag<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\u63A8\u8350<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>stylus<span class="token punctuation">&quot;</span></span> <span class="token attr-name">scoped</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
.tag
  position absolute
  right 0
  top 0
  background #FFBD09
  border-radius 0 7px 0 16px
  padding 6px 8px
  font-size 12px
  color #FFF
  font-weight normal
  line-height 1
  &amp;<span class="token punctuation">:</span><span class="token punctuation">:</span>before
    content <span class="token string">&#39;&#39;</span>
    position absolute
    width 10px
    height 10px
    left -10px
    top 0
    background #000
    // \u5DE6\u4E0A\u89D2
    background <span class="token function">radial-gradient</span><span class="token punctuation">(</span>circle at 0 100%<span class="token punctuation">,</span> transparent 10px<span class="token punctuation">,</span> #FFBD09 10px<span class="token punctuation">)</span>
    // \u5DE6\u4E0B\u89D2
    // background <span class="token function">radial-gradient</span><span class="token punctuation">(</span>circle at 0 0<span class="token punctuation">,</span> transparent 10px<span class="token punctuation">,</span> #FFBD09 10px<span class="token punctuation">)</span>
    // \u53F3\u4E0A\u89D2
    // background <span class="token function">radial-gradient</span><span class="token punctuation">(</span>circle at 100% 100%<span class="token punctuation">,</span> transparent 10px<span class="token punctuation">,</span> #FFBD09 10px<span class="token punctuation">)</span>
    // \u53F3\u4E0B\u89D2
    // background <span class="token function">radial-gradient</span><span class="token punctuation">(</span>circle at 100% 0<span class="token punctuation">,</span> transparent 10px<span class="token punctuation">,</span> #FFBD09 10px<span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div>`,4);function t(e,c){return p}var u=a(s,[["render",t]]);export{u as default};
