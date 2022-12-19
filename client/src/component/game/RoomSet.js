/** 게임 - 방 설정 */
function RoomSet () {
    return (
        <div className = "roomset">
            <div className = "set-container">
                <div className = "title"><input type="text" placeholder = "방 제목"></input></div>
                <div className = "password"><input type="text" placeholder = "방 비밀번호"></input></div>
                <div className = "limit-time">
                    <form>
                        <select name = "time">
                            <option value = "default">=== 선택 ===</option>
                            <option value = "10">10초</option>
                            <option value = "30">30초</option>
                            <option value = "60">60초</option>
                        </select>
                    </form>
                </div>
                <div className = "limit-people">
                    <input type="checkbox" name="2" value="2인" checked/>
                    <input type="checkbox" name="3" value="3인"/>
                </div>
                <button className = "cancel">나가기</button>
            </div>
        </div>
    );
}

export default RoomSet;