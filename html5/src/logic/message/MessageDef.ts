enum MessageDef
{
	//bulletin
    Request_GetServerInfo = 20,
    Reply_GetServerInfo = 21,
    Request_GetDefaultServerInfo = 22,
    Reply_GetDefaultServerInfo = 23,
    Request_BindAccount = 24,
    Reply_BindAccount = 25,
    Request_BindActivationCode = 26,
    Reply_BindActivationCode = 27,

	//login
    Request_MobileLogin = 101,
    Reply_MobileLoginResult = 102,
    Request_MobileLogout = 110,
    Reply_MobileLogoutResult = 111,
    Request_MobileRoleLogin = 120,
    Reply_MobileRoleLoginResult = 121,
    Request_UpdateMSDKAuthInfo = 122,
	Request_GetBalance = 123,
    Reply_GetBalance = 124,
    Reply_UpdateMSDKAuthInfo = 125,
    Request_SendAntiData = 126,
    Reply_SendAntiData = 127,
    Push_RecvAntiData = 128,
    Push_BeStrongerAction = 129,
    Push_ModuleCloseInfo = 130,
    Push_MsgTip = 131,
    Request_AppResume = 132,
    Reply_AppResume = 133,
	Request_EnterInnerGame = 134,
	Request_ExitInnerGame = 135,
    
    //match
    RequestJoinGame = 350,
    ReplyJoinGame,
    RequestApplyMatch = 352,
    ReplyApplyMatch = 353,
    PushApplyInfo = 354,


    //ingame
    InGame_Start = 10000,
    InGame_StartLoading = 10001,
    InGame_LoadingComplete = 10002,
    InGame_StartGame = 10003,
    InGame_SyncCommands = 10004,
    InGame_GameOver = 10005,
    InGame_Ping = 10006,
    InGame_HeartBeat = 10007,
}