import React, { useState } from "react";

export default function FollowersPane({
                                          activeFollowTab,
                                          followers,
                                          following,
                                          onUnfollow,
                                      }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTab, setModalTab] = useState("follower");

    const openModal = (tab) => {
        setModalTab(tab);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const renderList = (list, type) => (
        <div className="mypage-follow-list">
            {list.length === 0 ? (
                <p>
                    {type === "follower"
                        ? "팔로워가 없습니다."
                        : "팔로잉한 사용자가 없습니다."}
                </p>
            ) : (
                list.map((f) => (
                    <div key={f.memberId} className="follower-entry">
                        <img
                            src={f.profileImg || "https://via.placeholder.com/40"}
                            alt={`${f.nickname} 프로필`}
                            className="follower-avatar"
                        />
                        <div className="follower-info">
                            <div className="nickname">{f.nickname}</div>
                            <div className="credibility">
                                {f.credibility != null ? f.credibility.toFixed(1) : "0.0"}
                            </div>
                        </div>
                        {type === "following" ? (
                            <button
                                className="follow-btn"
                                onClick={() => onUnfollow(f.memberId)}
                            >
                                언팔로우
                            </button>
                        ) : (
                            <button className="follow-btn">팔로우</button>
                        )}
                    </div>
                ))
            )}
        </div>
    );

    return (
        <>
            {/* 데스크탑용 패널 */}
            <div className="mypage-followers-pane desktop-only">
                {activeFollowTab === "follower" && renderList(followers, "follower")}
                {activeFollowTab === "following" && renderList(following, "following")}
            </div>

            {/* 모바일에서 팔로워/팔로잉 숫자 클릭 시 모달 오픈 */}
            <div className="mobile-follow-stats">
                <div onClick={() => openModal("follower")} className="stat-item">
                    팔로워 {followers.length}
                </div>
                <div onClick={() => openModal("following")} className="stat-item">
                    팔로잉 {following.length}
                </div>
            </div>

            {/* 모바일 모달 */}
            {isModalOpen && (
                <div className="followers-modal-overlay" onClick={closeModal}>
                    <div className="followers-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-tabs">
                            <button
                                className={modalTab === "follower" ? "active" : ""}
                                onClick={() => setModalTab("follower")}
                            >
                                팔로워
                            </button>
                            <button
                                className={modalTab === "following" ? "active" : ""}
                                onClick={() => setModalTab("following")}
                            >
                                팔로잉
                            </button>
                        </div>
                        {modalTab === "follower" && renderList(followers, "follower")}
                        {modalTab === "following" && renderList(following, "following")}
                    </div>
                </div>
            )}
        </>
    );
}