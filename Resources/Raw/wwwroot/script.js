$(document).ready(function() {
    let isWiring = false;
    let startNode = null;
    let waypoints = []; 
    let $activePolyline = null;
    let connections = [];
    let $selectedElement = null;


    $(".device-item").draggable({
        helper: "clone",
        revert: "invalid",
        zIndex: 2000,
        start: function(e, ui) {
            $(ui.helper).css({
                "width": "100px",
                "background": "var(--bg-color)",
                "box-shadow": "10px 10px 20px var(--shadow-dark)",
                "position": "absolute" 
            });
        }
    });


    $("#canvas").droppable({
        accept: ".device-item",
        drop: function(event, ui) {
            const type = ui.helper.data("type");
            const offset = $(this).offset();
            const x = event.pageX - offset.left;
            const y = event.pageY - offset.top;
            
            addNewDevice(type, x, y);
        }
    });


    function addNewDevice(type, x, y) {
        let deviceHtml = "";
        
        if (type === "S32K144") {
            deviceHtml = `
            <div class="device" data-name="S32K144" style="width: 160px; height: 160px; top: ${y}px; left: ${x}px;">
                <img src="./Image/S32K144.png" alt="S32K144">
                <div class="dot" data-pin="PTA12" data-type="IN" style="left: -7px; top: 50px; background: #3d5afe;"></div>
                <span class="pin-label" style="left: -45px; top: 50px;">PTA12</span>
                <div class="dot" data-pin="PTD15" data-type="IN" style="left: -7px; top: 100px; background: #3d5afe;"></div>
                <span class="pin-label" style="left: -45px; top: 100px;">PTD15</span>
                <div class="dot" data-pin="PTB2" data-type="OUT" style="right: -7px; top: 75px; background: #27ae60;"></div>
                <span class="pin-label" style="right: -40px; top: 75px;">PTB2</span>
                <div class="dot" data-pin="VCC" data-type="PWR" style="top: -7px; left: 50%; margin-left: -5px; background: #e74c3c;"></div>
                <span class="pin-label" style="left: 50%; transform: translateX(-50%); top: -25px;">VCC</span>
                <div class="dot" data-pin="GND" data-type="GND" style="bottom: -7px; left: 50%; margin-left: -5px; background: #333;"></div>
                <span class="pin-label" style="left: 50%; transform: translateX(-50%); bottom: -25px;">GND</span>
            </div>`;
        } else if (type === "Battery") {
            deviceHtml = `
            <div class="device" data-name="Battery" style="width: 90px; height: 120px; top: ${y}px; left: ${x}px;">
                <img src="./Image/Battery_12VDC_8Ah.png" alt="Battery">
                <div class="dot" data-pin="VCC +12V" data-type="PWR" style="right: -7px; top: 30px; background: #e74c3c;"></div>
                <span class="pin-label" style="right: -40px; top: 30px;">+12V</span>
                <div class="dot" data-pin="GND" data-type="GND" style="right: -7px; top: 85px; background: #333;"></div>
                <span class="pin-label" style="right: -35px; top: 85px;">GND</span>
            </div>`;
        } else if (type === "LM2596") {
            deviceHtml = `
            <div class="device" data-name="LM2596" style="width: 140px; height: 80px; top: ${y}px; left: ${x}px;">
                <img src="./Image/LM2596.png" alt="LM2596">
                <div class="dot" data-pin="IN+" data-type="PWR" style="left: -7px; top: 15px; background: #e74c3c;"></div>
                <span class="pin-label" style="left: -30px; top: 15px;">IN+</span>
                <div class="dot" data-pin="IN-" data-type="GND" style="left: -7px; top: 55px; background: #333;"></div>
                <span class="pin-label" style="left: -30px; top: 55px;">IN-</span>
                <div class="dot" data-pin="OUT+" data-type="PWR" style="right: -7px; top: 15px; background: #e74c3c;"></div>
                <span class="pin-label" style="right: -40px; top: 15px;">OUT+</span>
                <div class="dot" data-pin="OUT-" data-type="GND" style="right: -7px; top: 55px; background: #333;"></div>
                <span class="pin-label" style="right: -40px; top: 55px;">OUT-</span>
            </div>`;
        } else if (type === "HC-SR04") {
            deviceHtml = `
            <div class="device" data-name="HC-SR04" style="width: 140px; height: 70px; top: ${y}px; left: ${x}px;">
                <img src="./Image/HC-SR04.png" alt="HC-SR04">
                <div class="dot" data-pin="VCC" data-type="PWR" style="left: 25px; bottom: -7px; background: #e74c3c;"></div>
                <span class="pin-label" style="left: 20px; bottom: -22px;">VCC</span>
                <div class="dot" data-pin="TRIG" data-type="IN" style="left: 55px; bottom: -7px; background: #3d5afe;"></div>
                <span class="pin-label" style="left: 50px; bottom: -22px;">TRIG</span>
                <div class="dot" data-pin="ECHO" data-type="OUT" style="left: 85px; bottom: -7px; background: #27ae60;"></div>
                <span class="pin-label" style="left: 80px; bottom: -22px;">ECHO</span>
                <div class="dot" data-pin="GND" data-type="GND" style="left: 115px; bottom: -7px; background: #333;"></div>
                <span class="pin-label" style="left: 110px; bottom: -22px;">GND</span>
            </div>`;
        } else if (type === "LCD") {
            deviceHtml = `
            <div class="device" data-name="LCD16x2_I2C" style="width: 180px; height: 100px; top: ${y}px; left: ${x}px;">
                <img src="./Image/LCD_16x2.png" alt="LCD 16x2 I2C" style="width: 100%; opacity: 0.9;">
                <div class="dot" data-pin="GND" data-type="GND" style="right: -7px; top: 20px; background: #333;"></div>
                <span class="pin-label" style="right: -40px; top: 20px;">GND</span>
                <div class="dot" data-pin="VCC" data-type="PWR" style="right: -7px; top: 40px; background: #e74c3c;"></div>
                <span class="pin-label" style="right: -40px; top: 40px;">VCC</span>
                <div class="dot" data-pin="SDA" data-type="IN" style="right: -7px; top: 60px; background: #f1c40f;"></div>
                <span class="pin-label" style="right: -40px; top: 60px;">SDA</span>
                <div class="dot" data-pin="SCL" data-type="IN" style="right: -7px; top: 80px; background: #f1c40f;"></div>
                <span class="pin-label" style="right: -40px; top: 80px;">SCL</span>
                <div style="position:absolute; bottom:5px; left:5px; font-size:9px; color:#27ae60; font-weight:bold;">I2C MODE</div>
            </div>`;
        }

        if (deviceHtml) {
            const $newDev = $(deviceHtml);
            $("#canvas").append($newDev);
            initDeviceEvents($newDev);
        }
    }

    function initDeviceEvents($el) {
        $el.draggable({
            containment: "parent",
            drag: function() { updateAllLines(); }
        }).on("mousedown", function(e) {
            e.stopPropagation();
            clearSelection();
            $(this).addClass("selected");
            $selectedElement = $(this);
        });

        $el.find(".dot").on("mousedown", handleDotClick);
    }


    function handleDotClick(e) {
        e.stopPropagation();
        e.preventDefault();
        const $this = $(this);

        if (!isWiring) {
            isWiring = true;
            startNode = $this;
            const startPos = getCenter($this);
            waypoints = [startPos, startPos]; 
            
            $activePolyline = $(document.createElementNS("http://www.w3.org/2000/svg", "polyline")).attr({
                "stroke": "#555", "stroke-width": "2", "fill": "none", "stroke-dasharray": "4", "id": "drawing-line"
            });
            $("#svg-layer").append($activePolyline);
        } else {
            if ($this.is(startNode)) return;
            const srcType = startNode.data('type');
            const tarType = $this.data('type');

            if (srcType !== "PWR" && srcType !== "GND" && srcType === tarType) {
                alert("Lỗi: Không thể nối 2 chân cùng loại " + srcType);
                cancelWiring();
            } else {
                waypoints[waypoints.length - 1] = getCenter($this);
                $activePolyline.data("source", startNode)
                               .data("target", $this)
                               .data("path-data", [...waypoints])
                               .attr({
                                   "stroke": getWireColor(srcType),
                                   "stroke-dasharray": "none",
                                   "stroke-width": "3",
                                   "class": "wire-path"
                               }).removeAttr("id");

                connections.push({
                    from: { dev: startNode.closest('.device').data('name'), pin: startNode.data('pin') },
                    to: { dev: $this.closest('.device').data('name'), pin: $this.data('pin') }
                });
                resetWiringState();
                $("#status").text("Trạng thái: Đã kết nối " + startNode.data('pin') + " với " + $this.data('pin'));
            }
        }
    }


    $(document).on("mousedown", ".wire-path", function(e) {
        e.stopPropagation();
        clearSelection();
        $(this).addClass("selected");
        $selectedElement = $(this);
    });

    $("#canvas").on("mousedown", function(e) {
        if ($(e.target).is("#canvas") || $(e.target).is("#svg-layer")) {
            clearSelection();
        }
        if (!isWiring || $(e.target).hasClass("dot")) return;

        const mousePos = getMousePos(e);
        waypoints[waypoints.length - 1] = mousePos; 
        waypoints.push(mousePos); 
    });


    $("#canvas").on("contextmenu", function(e) {
        if (isWiring) {
            e.preventDefault();
            cancelWiring();
            $("#status").text("Trạng thái: Đã hủy thao tác nối dây.");
        }
    });


    $(document).on("keydown", function(e) {
        if (e.key === "Escape") {
            isWiring ? cancelWiring() : clearSelection();
        }
    });


    $("#delete-btn").on("click", function() {
        if (!$selectedElement) return;
        if ($selectedElement.hasClass("device")) {
            $(".wire-path").each(function() {
                const $wire = $(this);
                if ($wire.data("source").closest('.device').is($selectedElement) || 
                    $wire.data("target").closest('.device').is($selectedElement)) {
                    removeConnectionData($wire);
                    $wire.remove();
                }
            });
            $selectedElement.remove();
        } else {
            removeConnectionData($selectedElement);
            $selectedElement.remove();
        }
        $selectedElement = null;
        $("#status").text("Trạng thái: Đã xóa thành phần được chọn.");
    });


    $("#generate-btn").on("click", function() {
        const clock = parseInt($("#cfg-clock").val()) || 80;
        const bus = parseInt($("#cfg-bus").val()) || 40;
        const projectName = $("#cfg-project").val() || "S32K144_Project";

        if (connections.length === 0) {
            $("#status").text("Trạng thái: Vui lòng nối dây trước khi xuất code!");
            return;
        }


        let code = `/* \n * Project: ${projectName}\n * Target: NXP S32K144 \n * Clock: SOSC ${clock}MHz, Bus ${bus}MHz\n */\n\n`;
        code += `#include "S32K144.h"\n#include "device_registers.h"\n`;
        code += `\nvoid SOSC_init_Custom(void) {\n    /* Configuration for ${clock}MHz clock source */\n    SCG->SOSCCFG = SCG_SOSCCFG_EREFS_MASK | SCG_SOSCCFG_RANGE(2);\n    while(!(SCG->SOSCCSR & SCG_SOSCCSR_SOSCVLD_MASK));\n    SCG->RCCR = SCG_RCCR_SCS(1) | SCG_RCCR_DIVCORE(0) | SCG_RCCR_DIVBUS(1);\n}\n\n`;

        let gpioCode = `void GPIO_Init(void) {\n`;
        let mcuConfig = {}; 
        let usedPorts = new Set();

        connections.forEach(conn => {
            let pin = (conn.from.dev === "S32K144") ? conn.from.pin : (conn.to.dev === "S32K144" ? conn.to.pin : null);
            if (pin && pin.startsWith("PT")) {
                const type = $(`.device[data-name='S32K144'] .dot[data-pin='${pin}']`).data('type');
                mcuConfig[pin] = (type === "IN");
                usedPorts.add(pin[2]); 
            }
        });

        usedPorts.forEach(port => {
            gpioCode += `    PCC->PCCn[PCC_PORT${port}_INDEX] |= PCC_PCCn_CGC_MASK;\n`;
        });

        Object.keys(mcuConfig).forEach(pin => {
            const port = pin[2], pinNum = pin.substring(3);
            gpioCode += `    /* Configuration for ${pin} */\n`;
            gpioCode += `    PORT${port}->PCR[${pinNum}] = (PORT${port}->PCR[${pinNum}] & ~PORT_PCR_MUX_MASK) | PORT_PCR_MUX(1);\n`;
            gpioCode += `    PT${port}->PDDR ${mcuConfig[pin] ? '&=' : '|='} ~(1 << ${pinNum});\n`;
        });
        gpioCode += `}\n\n`;

        code += gpioCode;
        code += `int main(void) {\n    SOSC_init_Custom();\n    GPIO_Init();\n    \n    while(1) {\n        // Application loop\n    }\n    return 0;\n}`;

        $("#code-display").text(code);
        if ($("#export-zip-btn").length === 0) {
            $("#code-modal .modal-content").append('<button id="export-zip-btn" style="margin-top:10px; background:#3498db; color:white; border:none; padding:10px; border-radius:5px; cursor:pointer; width:100%;">Download Project (.zip)</button>');
        }
        $("#code-modal").fadeIn();
    });


    $(document).on("click", "#export-zip-btn", function() {
        const projectName = $("#cfg-project").val() || "S32K144_Project";
        const zip = new JSZip();
        const folder = zip.folder(projectName);
        folder.file("main.c", $("#code-display").text());
        folder.file("main.h", `#ifndef MAIN_H\n#define MAIN_H\n#include "S32K144.h"\nvoid SOSC_init_Custom(void);\nvoid GPIO_Init(void);\n#endif`);
        zip.generateAsync({type:"blob"}).then(c => saveAs(c, `${projectName}.zip`));
    });


    $(document).on("click", "#copy-btn", function() {
        const text = $("#code-display").text();
        const $temp = $("<textarea>");
        $("body").append($temp);
        $temp.val(text).select();
        document.execCommand("copy");
        $temp.remove();
        
        const $btn = $(this);
        $btn.text("Copied!").css("background", "#2ecc71");
        setTimeout(() => $btn.text("Copy Code").css("background", ""), 2000);
    });


    $("#close-modal").on("click", function() { $("#code-modal").fadeOut(); });

    function cancelWiring() { if ($activePolyline) $activePolyline.remove(); resetWiringState(); }
    function clearSelection() { $(".selected").removeClass("selected"); $selectedElement = null; }
    function resetWiringState() { isWiring = false; startNode = null; waypoints = []; $activePolyline = null; }
    function getMousePos(e) { const off = $("#canvas").offset(); return { x: e.pageX - off.left, y: e.pageY - off.top }; }
    function renderPolyline($el, pts) { if ($el) $el.attr("points", pts.map(p => `${p.x},${p.y}`).join(" ")); }
    function getWireColor(type) { return { "PWR": "red", "GND": "black", "OUT": "green" }[type] || "blue"; }
    
    function getCenter($el) {
        const c = $("#canvas").offset(), e = $el.offset();
        return { x: e.left - c.left + $el.outerWidth()/2, y: e.top - c.top + $el.outerHeight()/2 };
    }

    function updateAllLines() {
        $(".wire-path").each(function() {
            const $el = $(this), s = $el.data("source"), t = $el.data("target");
            let pts = $el.data("path-data");
            if (s && t && pts) {
                pts[0] = getCenter(s); pts[pts.length - 1] = getCenter(t);
                renderPolyline($el, pts);
            }
        });
    }

    function removeConnectionData($wire) {
        const s = $wire.data("source"), t = $wire.data("target");
        if (s && t) {
            connections = connections.filter(c => !(c.from.pin === s.data('pin') && c.to.pin === t.data('pin')));
        }
    }


    $(document).on("mousemove", function(e) {
        if (!isWiring) return;
        waypoints[waypoints.length - 1] = getMousePos(e);
        renderPolyline($activePolyline, waypoints);
    });


    $(".device").each(function() {
        initDeviceEvents($(this));
    });


    document.querySelectorAll('.custom-dropdown').forEach(dropdown => {
        const selected = dropdown.querySelector('.selected');
        const list = dropdown.querySelector('.dropdown-list');

        selected.addEventListener('click', () => {
            list.style.display = list.style.display === 'block' ? 'none' : 'block';
        });

        list.querySelectorAll('li').forEach(item => {
            item.addEventListener('click', () => {
                selected.textContent = item.textContent;
                selected.dataset.value = item.dataset.value;
                list.style.display = 'none';
            });
        });

        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                list.style.display = 'none';
            }
        });
    });


});