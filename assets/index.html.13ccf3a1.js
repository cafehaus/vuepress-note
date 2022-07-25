import{r as p,o as t,c,a as s,b as o,F as l,e as a,d as n}from"./app.56a26a36.js";import{_ as r}from"./plugin-vue_export-helper.21dcd24c.js";const i={},u=a(`<h1 id="\u90A3\u4E9B\u76F8\u89C1\u6068\u665A\u7684\u5DE5\u4F5C\u6280\u5DE7" tabindex="-1"><a class="header-anchor" href="#\u90A3\u4E9B\u76F8\u89C1\u6068\u665A\u7684\u5DE5\u4F5C\u6280\u5DE7" aria-hidden="true">#</a> \u90A3\u4E9B\u76F8\u89C1\u6068\u665A\u7684\u5DE5\u4F5C\u6280\u5DE7</h1><h2 id="\u901A\u8FC7mixins\u6765\u6DF7\u5165vue\u7EC4\u4EF6\u7684js\u903B\u8F91" tabindex="-1"><a class="header-anchor" href="#\u901A\u8FC7mixins\u6765\u6DF7\u5165vue\u7EC4\u4EF6\u7684js\u903B\u8F91" aria-hidden="true">#</a> \u901A\u8FC7mixins\u6765\u6DF7\u5165vue\u7EC4\u4EF6\u7684js\u903B\u8F91</h2><p>\u9002\u5408\u9875\u9762\u903B\u8F91\u6BD4\u8F83\u590D\u6742\u7684\uFF0C\u53EF\u4EE5\u8FD9\u6837\u62C6\u5206\uFF0C\u5C06\u9875\u9762\u7ED3\u6784\u548Cjs\u72EC\u7ACB\u51FA\u6765</p><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>page<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    Hello\uFF0Cworld
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token comment">// \u901A\u8FC7 mixins \u6765\u6DF7\u5165 js \u903B\u8F91</span>
  <span class="token keyword">import</span> curPageJs <span class="token keyword">from</span> <span class="token string">&quot;./cur-page.js&quot;</span>
  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
	<span class="token literal-property property">mixins</span><span class="token operator">:</span><span class="token punctuation">[</span>curPageJs<span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
<span class="token selector">.page</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h2 id="\u7528index-js\u5BFC\u5165\u5BFC\u51FA\u5F53\u524D\u7EC4\u4EF6" tabindex="-1"><a class="header-anchor" href="#\u7528index-js\u5BFC\u5165\u5BFC\u51FA\u5F53\u524D\u7EC4\u4EF6" aria-hidden="true">#</a> \u7528index.js\u5BFC\u5165\u5BFC\u51FA\u5F53\u524D\u7EC4\u4EF6</h2><p>\u4E00\u822Cvue\u7EC4\u4EF6\uFF0C\u5982\u679C\u6211\u4EEC\u5168\u90E8\u7528index.vue\u53BB\u547D\u540D\u5F00\u53D1\uFF0C\u4F1A\u5BFC\u81F4\u7F16\u8F91\u5668\u91CC\u4E00\u5806\u7684index\uFF0C\u4E0D\u597D\u533A\u5206\uFF0C\u800C\u4E0D\u7528 index.vue \u7684\u8BDD\u5F15\u5165\u7EC4\u4EF6\u7684\u65F6\u5019\u53C8\u9700\u8981\u591A\u5199\u4E00\u5C42\u8DEF\u5F84</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// \u5176\u4ED6\u9875\u9762\u5F15\u5165\u65F6\u53EA\u9700\u50CF\u4E0B\u9762\u8FD9\u6837</span>
<span class="token comment">// import Comp from &#39;@components/comp&#39;</span>

<span class="token comment">// index.js</span>
<span class="token keyword">import</span> Comp <span class="token keyword">from</span> <span class="token string">&#39;./comp.vue&#39;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> Comp
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><ul><li>\u6CE8\u610F\u5728uniapp\u7684vue\u7EC4\u4EF6\u4E2D\uFF0C\u7528\u4E0A\u9762\u7684\u7B80\u5199\u65B9\u5F0F\u4F1A\u5BFC\u81F4\u5728\u5C0F\u7A0B\u5E8F\u4E2D\u52A0\u8F7D\u4E0D\u5230\u7EC4\u4EF6\uFF0C\u9700\u8981\u5199\u6210\u5B8C\u6574\u7684\u8DEF\u5F84\uFF1Aimport Comp from &#39;@components/comp/comp&#39;</li></ul><h2 id="\u6309\u952E\u76D8\u4E0A\u7684\u4E0A\u4E0B\u7BAD\u5934\u2191\u2193\u53EF\u4EE5\u5FEB\u6377\u5207\u6362\u5386\u53F2\u7EC8\u7AEF\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#\u6309\u952E\u76D8\u4E0A\u7684\u4E0A\u4E0B\u7BAD\u5934\u2191\u2193\u53EF\u4EE5\u5FEB\u6377\u5207\u6362\u5386\u53F2\u7EC8\u7AEF\u547D\u4EE4" aria-hidden="true">#</a> \u6309\u952E\u76D8\u4E0A\u7684\u4E0A\u4E0B\u7BAD\u5934\u2191\u2193\u53EF\u4EE5\u5FEB\u6377\u5207\u6362\u5386\u53F2\u7EC8\u7AEF\u547D\u4EE4</h2><p>\u4EE5\u524D\u90FD\u50BB\u50BB\u7684\u81EA\u5DF1\u4E00\u904D\u4E00\u904D\u5730\u6572\uFF0C\u76F4\u63A5\u901A\u8FC7\u4E0A\u4E0B\u7BAD\u5934\u5C31\u53EF\u4EE5\u5FEB\u6377\u5207\u6362\u9009\u62E9</p><h2 id="\u6572\u952E\u76D8\u4E0A\u7684tab\u952E\u53EF\u4EE5\u81EA\u52A8\u8865\u5168\u8DEF\u5F84" tabindex="-1"><a class="header-anchor" href="#\u6572\u952E\u76D8\u4E0A\u7684tab\u952E\u53EF\u4EE5\u81EA\u52A8\u8865\u5168\u8DEF\u5F84" aria-hidden="true">#</a> \u6572\u952E\u76D8\u4E0A\u7684Tab\u952E\u53EF\u4EE5\u81EA\u52A8\u8865\u5168\u8DEF\u5F84</h2><p>\u4E00\u822Cnode\u5F00\u53D1\u4E2D\u6BD4\u8F83\u6709\u7528\uFF0C\u5982\u679C\u5728windows\u4E2D\u65E0\u6548\uFF0C\u9700\u8981\u81EA\u5DF1\u4FEE\u6539\u4E0B\u6CE8\u518C\u8868</p><h2 id="\u5728\u7535\u8111\u6587\u4EF6\u5939\u8DEF\u5F84\u4E2D\u76F4\u63A5\u8F93\u5165cmd-\u53EF\u4EE5\u5728\u5F53\u524D\u76EE\u5F55\u6253\u5F00\u5C0F\u9ED1\u7A97" tabindex="-1"><a class="header-anchor" href="#\u5728\u7535\u8111\u6587\u4EF6\u5939\u8DEF\u5F84\u4E2D\u76F4\u63A5\u8F93\u5165cmd-\u53EF\u4EE5\u5728\u5F53\u524D\u76EE\u5F55\u6253\u5F00\u5C0F\u9ED1\u7A97" aria-hidden="true">#</a> \u5728\u7535\u8111\u6587\u4EF6\u5939\u8DEF\u5F84\u4E2D\u76F4\u63A5\u8F93\u5165cmd\uFF0C\u53EF\u4EE5\u5728\u5F53\u524D\u76EE\u5F55\u6253\u5F00\u5C0F\u9ED1\u7A97</h2><p>\u6BCF\u6B21 win + R \uFF0C\u7136\u540E cmd \u6253\u5F00\u7684\u5C0F\u9ED1\u7A97\u90FD\u662F\u5728c\u76D8\u76EE\u5F55\uFF0C\u8981\u8FD0\u884C\u5176\u4ED6\u76EE\u5F55\u7684\u6587\u4EF6\u8981 cd \u4E00\u5806\u8DEF\u5F84\uFF0C\u5341\u5206\u4E0D\u65B9\u4FBF\u3002\u76F4\u63A5\u5728 windows \u7535\u8111\u9876\u90E8\u7684\u6587\u4EF6\u5939\u8DEF\u5F84\u8F93\u5165\u6846\u4E2D\u8F93\u5165 cmd \u4E00\u56DE\u8F66\uFF0C\u4F1A\u81EA\u52A8\u5B9A\u4F4D\u5230\u5F53\u524D\u76EE\u5F55\u3002</p><p>PowerShell\u4E5F\u6709\u540C\u6837\u7684\u6280\u5DE7\uFF0C\u5728\u5F53\u524D\u76EE\u5F55\u4E0B\u6309\u4F4FShift\u952E\uFF0C\u7136\u540E\u70B9\u51FB\u9F20\u6807\u53F3\u952E\uFF0C\u5C31\u4F1A\u5728\u83DC\u5355\u4E2D\u770B\u5230\uFF1A\u5728\u6B64\u5904\u6253\u5F00 PowerShell \u7A97\u53E3(S)</p><h2 id="\u7EC8\u7AEF\u547D\u4EE4\u5C0F\u9ED1\u7A97\u6CA1\u6CD5\u64CD\u4F5C" tabindex="-1"><a class="header-anchor" href="#\u7EC8\u7AEF\u547D\u4EE4\u5C0F\u9ED1\u7A97\u6CA1\u6CD5\u64CD\u4F5C" aria-hidden="true">#</a> \u7EC8\u7AEF\u547D\u4EE4\u5C0F\u9ED1\u7A97\u6CA1\u6CD5\u64CD\u4F5C</h2><p>\u6709\u65F6\u8F93\u5165\u4E86 git \u547D\u4EE4\u5982 git branch\uFF0Cvscode \u91CC\u7684\u7EC8\u7AEF\u547D\u4EE4\u5C31\u663E\u793A : \u6216\u8005 (END)\uFF0C\u6CA1\u6CD5\u64CD\u4F5C\u4E5F\u6CA1\u6CD5\u9000\u51FA\uFF0Cctrl + Z \u6216 ctrl + C \u90FD\u6CA1\u7528\uFF0C\u4EE5\u524D\u90FD\u76F4\u63A5\u5173\u6389\u7EC8\u7AEF\u7136\u540E\u518D\u91CD\u65B0\u6253\u5F00\u6765\u89E3\u51B3\uFF0C\u5176\u5B9E\u53EA\u7528\u6309\u4E00\u4E0B\u952E\u76D8\u4E0A\u7684 Q \u952E\uFF0C\u5C31\u4F1A\u81EA\u52A8\u9000\u51FA\uFF0C\u548C\u54B1\u5E73\u65F6 ctrl + C \u4E00\u6837\u7684\u6548\u679C\u4E86\u3002</p>`,17),d=n("\u9020\u6210\u8FD9\u4E2A\u95EE\u9898\u7684\u5143\u51F6\u662F git \u7684\u5206\u9875\u5668 "),m={href:"https://git-scm.com/docs/git-config#Documentation/git-config.txt-corepager",target:"_blank",rel:"noopener noreferrer"},k=n("pager"),b=n("\uFF0Cgit \u5728 windows \u4E0B\u9ED8\u8BA4\u7684\u5206\u9875\u5668\u662F less\uFF0C\u8981\u89E3\u51B3\u4E0A\u9762\u7684\u95EE\u9898\uFF0C\u6709\u4E24\u79CD\u65B9\u5F0F\uFF1A"),g=a(`<div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u65B9\u5F0F\u4E00\uFF1A\u4F1A\u5C4F\u853D\u6389 git \u6240\u6709\u547D\u4EE4\u7684\u5206\u9875\u5668\uFF1Agit branch / git show / git log...</span>
<span class="token function">git</span> config --global core.pager <span class="token string">&#39;&#39;</span>

<span class="token comment"># \u65B9\u5F0F\u4E8C\uFF1A\u53EA\u5173\u95ED git branch \u7684\u5206\u9875\u5668</span>
<span class="token function">git</span> config --global pager.branch <span class="token boolean">false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>\u7EFC\u4E0A\u6240\u8FF0\uFF0C\u8FD8\u662F\u63A8\u8350\u76F4\u63A5\u6309 Q \u952E\u5427\u3002</p>`,2);function h(v,x){const e=p("ExternalLinkIcon");return t(),c(l,null,[u,s("p",null,[d,s("a",m,[k,o(e)]),b]),g],64)}var w=r(i,[["render",h]]);export{w as default};