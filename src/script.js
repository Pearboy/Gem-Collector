function initGame() {
    document.getElementById("clickCounter").innerHTML = clicks;
    document.getElementById("goldAmount").innerHTML = gold;
    document.getElementById("jewelsPerSecond").innerHTML = clicksPerSecond;

    document.getElementById("minerCost").innerHTML = miner.cost;
    document.getElementById("quarryCost").innerHTML = quarry.cost;
    document.getElementById("drillCost").innerHTML = drill.cost;
}

function updateCounter() {
    document.getElementById("goldAmount").innerHTML = gold;
    document.getElementById("jewelsPerSecond").innerHTML = clicksPerSecond;
}

function increment(element) {
    clicks++;
    gold += 1;
    document.getElementById("clickCounter").innerHTML = clicks;
    element.setAttribute("src", "imgs/clickActive.png");
    updateCounter();
}

function release(element) {
    element.setAttribute("src", "imgs/clickInactive.png");
}

function autoClick(number) {
    gold += number;
    updateCounter();
}

function checkGold(cost) {
    if (gold >= cost) {
        return 1;
    }
}

function minerUpgrade() {
    if (checkGold(miner.cost)) {
        gold -= miner.cost;
        miner.count++;
        clicksPerSecond += miner.power;
        miner.cost += miner.cost;
        document.getElementById("minerCost").innerHTML = miner.cost;
        document.getElementById("jewelsPerSecond").innerHTML = clicksPerSecond;
        updateCounter();

        var minerimg = document.createElement("img");
        minerimg.src = "imgs/miner.png";
        document.getElementById("miners").appendChild(minerimg);
        var i = 0;
        var minerimgs = ["imgs/mineractive.png", "imgs/miner.png"];
        var newMiner = window.setInterval(function(){
            minerimg.src = minerimgs[i]
            i = (i + 1) % minerimgs.length;
            autoClick(miner.power);
        }, 1000);
        miner.intervals.push(newMiner);
    }

    if (miner.count == 10) {
        document.getElementById("drill").style.display = "block";
    }
}

function quarryUpgrade() {
    if (checkGold(quarry.cost)) {
        gold -= quarry.cost;
        quarry.count++;
        clicksPerSecond += quarry.power;
        quarry.cost += quarry.cost;
        document.getElementById("quarryCost").innerHTML = quarry.cost;
	    document.getElementById("jewelsPerSecond").innerHTML = clicksPerSecond;
        updateCounter();

        var newQuarry = window.setInterval(function(){
            autoClick(quarry.power);
        }, 1000);
        quarry.intervals.push(newQuarry);
    }
}

function drillTool() {
    if (checkGold(drill.cost)) {
        gold -= drill.cost;
        miner.power += miner.power;

        // Update miner power of the running miner intervals.
        var i;
        for (i = 0; i < miner.intervals.length; i++) {
            clicksPerSecond += 1;
            clearInterval(miner.intervals[i]);
            miner.intervals[i] = window.setInterval(function(){
                autoClick(miner.power);
            }, 1000);
        }
        updateCounter();

        document.getElementById("drill").style.display = "none";
    }
}