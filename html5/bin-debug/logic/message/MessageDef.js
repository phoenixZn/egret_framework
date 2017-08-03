var MessageDef;
(function (MessageDef) {
    //bulletin
    MessageDef[MessageDef["Request_GetServerInfo"] = 20] = "Request_GetServerInfo";
    MessageDef[MessageDef["Reply_GetServerInfo"] = 21] = "Reply_GetServerInfo";
    MessageDef[MessageDef["Request_GetDefaultServerInfo"] = 22] = "Request_GetDefaultServerInfo";
    MessageDef[MessageDef["Reply_GetDefaultServerInfo"] = 23] = "Reply_GetDefaultServerInfo";
    MessageDef[MessageDef["Request_BindAccount"] = 24] = "Request_BindAccount";
    MessageDef[MessageDef["Reply_BindAccount"] = 25] = "Reply_BindAccount";
    MessageDef[MessageDef["Request_BindActivationCode"] = 26] = "Request_BindActivationCode";
    MessageDef[MessageDef["Reply_BindActivationCode"] = 27] = "Reply_BindActivationCode";
    //login
    MessageDef[MessageDef["Request_MobileLogin"] = 101] = "Request_MobileLogin";
    MessageDef[MessageDef["Reply_MobileLoginResult"] = 102] = "Reply_MobileLoginResult";
    MessageDef[MessageDef["Request_MobileLogout"] = 110] = "Request_MobileLogout";
    MessageDef[MessageDef["Reply_MobileLogoutResult"] = 111] = "Reply_MobileLogoutResult";
    MessageDef[MessageDef["Request_MobileRoleLogin"] = 120] = "Request_MobileRoleLogin";
    MessageDef[MessageDef["Reply_MobileRoleLoginResult"] = 121] = "Reply_MobileRoleLoginResult";
    MessageDef[MessageDef["Request_UpdateMSDKAuthInfo"] = 122] = "Request_UpdateMSDKAuthInfo";
    MessageDef[MessageDef["Request_GetBalance"] = 123] = "Request_GetBalance";
    MessageDef[MessageDef["Reply_GetBalance"] = 124] = "Reply_GetBalance";
    MessageDef[MessageDef["Reply_UpdateMSDKAuthInfo"] = 125] = "Reply_UpdateMSDKAuthInfo";
    MessageDef[MessageDef["Request_SendAntiData"] = 126] = "Request_SendAntiData";
    MessageDef[MessageDef["Reply_SendAntiData"] = 127] = "Reply_SendAntiData";
    MessageDef[MessageDef["Push_RecvAntiData"] = 128] = "Push_RecvAntiData";
    MessageDef[MessageDef["Push_BeStrongerAction"] = 129] = "Push_BeStrongerAction";
    MessageDef[MessageDef["Push_ModuleCloseInfo"] = 130] = "Push_ModuleCloseInfo";
    MessageDef[MessageDef["Push_MsgTip"] = 131] = "Push_MsgTip";
    MessageDef[MessageDef["Request_AppResume"] = 132] = "Request_AppResume";
    MessageDef[MessageDef["Reply_AppResume"] = 133] = "Reply_AppResume";
    MessageDef[MessageDef["Request_EnterInnerGame"] = 134] = "Request_EnterInnerGame";
    MessageDef[MessageDef["Request_ExitInnerGame"] = 135] = "Request_ExitInnerGame";
    //match
    MessageDef[MessageDef["RequestJoinGame"] = 350] = "RequestJoinGame";
    MessageDef[MessageDef["ReplyJoinGame"] = 351] = "ReplyJoinGame";
    MessageDef[MessageDef["RequestApplyMatch"] = 352] = "RequestApplyMatch";
    MessageDef[MessageDef["ReplyApplyMatch"] = 353] = "ReplyApplyMatch";
    MessageDef[MessageDef["PushApplyInfo"] = 354] = "PushApplyInfo";
    //ingame
    MessageDef[MessageDef["InGame_Start"] = 10000] = "InGame_Start";
    MessageDef[MessageDef["InGame_StartLoading"] = 10001] = "InGame_StartLoading";
    MessageDef[MessageDef["InGame_LoadingComplete"] = 10002] = "InGame_LoadingComplete";
    MessageDef[MessageDef["InGame_StartGame"] = 10003] = "InGame_StartGame";
    MessageDef[MessageDef["InGame_SyncCommands"] = 10004] = "InGame_SyncCommands";
    MessageDef[MessageDef["InGame_GameOver"] = 10005] = "InGame_GameOver";
    MessageDef[MessageDef["InGame_Ping"] = 10006] = "InGame_Ping";
    MessageDef[MessageDef["InGame_HeartBeat"] = 10007] = "InGame_HeartBeat";
})(MessageDef || (MessageDef = {}));
//# sourceMappingURL=MessageDef.js.map