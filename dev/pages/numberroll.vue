<template>
    <div class="count-to">
        <demo-block title="数字翻滚组件" desc="相关地址">
            <p>
                github文档地址:
                <a
                    href="https://github.com/PanJiaChen/vue-countTo"
                    target="_black"
                >https://github.com/PanJiaChen/vue-countTo</a>
            </p>
            <p>
                github demo:
                <a
                    href="https://github.com/PanJiaChen/vue-countTo"
                    target="_black"
                >https://github.com/PanJiaChen/vue-countTo</a>
            </p>
        </demo-block>
        <demo-block title="展示demo" desc>
            <div class="demo-wrap">
                <h3>simple example</h3>
                <code>&lt;countTo :startVal="0" :endVal="2017" :duration="4000"&gt;&lt;/countTo&gt;</code>
                <br />
                <countTo :startVal="0" :endVal="2017" :duration="4000"></countTo>
            </div>
            <div class="demo-wrap">
                <h3>count down example</h3>
                <code>&lt;countTo :startVal='2017' :endVal='0' :duration=8000&gt;&lt;/countTo&gt;</code>
                <br />
                <countTo :startVal="2017" :endVal="0" :duration="8000"></countTo>
            </div>
        </demo-block>
        <demo-block>
            <h3>Options 参数</h3>
            <table>
                <thead>
                    <tr>
                        <th>Property</th>
                        <th>Description</th>
                        <th align="center">type</th>
                        <th align="center">default</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>startVal</td>
                        <td>the value you want to begin at</td>
                        <td align="center">Number</td>
                        <td align="center">0</td>
                    </tr>
                    <tr>
                        <td>endVal</td>
                        <td>the value you want to arrive at</td>
                        <td align="center">Number</td>
                        <td align="center">2017</td>
                    </tr>
                    <tr>
                        <td>duration</td>
                        <td>duration in millisecond</td>
                        <td align="center">Number</td>
                        <td align="center">3000</td>
                    </tr>
                    <tr>
                        <td>autoplay</td>
                        <td>when mounted autoplay</td>
                        <td align="center">Boolean</td>
                        <td align="center">true</td>
                    </tr>
                    <tr>
                        <td>decimals</td>
                        <td>the number of decimal places to show</td>
                        <td align="center">Number</td>
                        <td align="center">0</td>
                    </tr>
                    <tr>
                        <td>decimal</td>
                        <td>the split decimal</td>
                        <td align="center">String</td>
                        <td align="center">.</td>
                    </tr>
                    <tr>
                        <td>separator</td>
                        <td>the separator</td>
                        <td align="center">String</td>
                        <td align="center">,</td>
                    </tr>
                    <tr>
                        <td>prefix</td>
                        <td>the prefix</td>
                        <td align="center">String</td>
                        <td align="center">''</td>
                    </tr>
                    <tr>
                        <td>suffix</td>
                        <td>the suffix</td>
                        <td align="center">String</td>
                        <td align="center">''</td>
                    </tr>
                    <tr>
                        <td>useEasing</td>
                        <td>is use easing function</td>
                        <td align="center">Boolean</td>
                        <td align="center">true</td>
                    </tr>
                    <tr>
                        <td>easingFn</td>
                        <td>the easing function</td>
                        <td align="center">Function</td>
                        <td align="center">—</td>
                    </tr>
                </tbody>
            </table>
            <p>** notes: when autoplay:true , it will auto start when startVal or endVal change **</p>
        </demo-block>
        <demo-block>
            <h3>Functions 参数</h3>
            <table>
                <thead>
                    <tr>
                        <th align="center">Function Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td align="center">mountedCallback</td>
                        <td>when mounted will emit mountedCallback</td>
                    </tr>
                    <tr>
                        <td align="center">start</td>
                        <td>start the countTo</td>
                    </tr>
                    <tr>
                        <td align="center">pause</td>
                        <td>pause the countTo</td>
                    </tr>
                    <tr>
                        <td align="center">reset</td>
                        <td>reset the countTo</td>
                    </tr>
                </tbody>
            </table>
        </demo-block>
    </div>
</template>
<script>
import countTo from '../component/vue-count-to';
export default {
  name: 'count-to',
  components: {
    countTo,
  },
  data() {
    return {}
  },
  //   methods: {
  //       name() {

  //       }
  //   },
}
</script>

<style lang="scss" scoped>
.count-to {
    h3 {
        font-size: 24px;
        color: #494949;
        line-height: 1.1;
    }
    h3,
    .demo-wrap {
        margin-bottom: 15px;
    }
    table {
        width: 100%;
        overflow: auto;
        tr {
            background-color: #fff;
            border-top: 1px solid #c6cbd1;
        }
        td,
        th {
            padding: 6px 13px;
            border: 1px solid #dfe2e5;
        }
    }
}
</style>