export function loadAndPlayAnimation(containerId, animationPath, duration = 3000) {
    const target_div = document.getElementById(containerId);
    return new Promise((resolve, reject) => {
        // 1. 加载动画JSON
        fetch(animationPath)
            .then(response => response.json())
            .then(animationData => {
                // 2. 播放动画
                if (document.getElementsByClassName("think_box").length > 0){
                    document.getElementsByClassName("think_box")[0].remove()
                }

                const think_box = document.createElement("div");
                think_box.className = "think_box";
                think_box.style.width = "100px";
                think_box.style.height = "50px";
                target_div.appendChild(think_box);

                const thinking_animation = lottie.loadAnimation({
                    container: think_box,
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    animationData: animationData,
                    rendererSettings: {
                        scaleMode: "fit",
                        scale: 0.1
                    }
                });

                // 3. 设置定时器，动画在指定时间后消失
                setTimeout(() => {
                    thinking_animation.destroy();
                    think_box.remove()
                    resolve(); // 动画消失后，Promise 完成
                }, duration);
            })
            .catch(error => {
                console.error('加载动画失败:', error);
                reject(error); // 如果出错，Promise 拒绝
            });
    });
}