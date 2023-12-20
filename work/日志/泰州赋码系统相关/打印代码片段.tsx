npm install print - js
import printJS from 'print-js'


<Button onClick={print}>打印</Button>
<div id="test" class="grid">
    <Image
        preview={false}
        width={200}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    />
    <div>
        <div class="fonttest">fewfewfew</div>
        <div>fewgre32432423</div>
    </div>
</div>


const print = () => {
    var style = '@page {margin: 0} .fonttest {font-size:40px}'
    printJS({
        printable: 'test',
        type: 'html',
        scanStyles: false,
        style: style
    })
}