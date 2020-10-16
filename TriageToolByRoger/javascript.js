

'-----This Sub runs as soon as you open the HTA
Sub Window_onLoad
    window.resizeTo 900,800

       
    
End Sub

Sub SearchAndRep(searchTerm, replaceTerm, app)
    app.Selection.GoTo 0
    With app.Selection.Find
        .ClearFormatting
        .Replacement.ClearFormatting
        .MatchWholeWord = True
        .Text = searchTerm
        .Execute ,,,,,,,,,replaceTerm
    End With
End Sub

Sub SearchAndRepHeader(searchTerm, replaceTerm, app)
	app.ActiveWindow.ActivePane.View.SeekView = 9
	app.Selection.find.text = searchTerm
	app.Selection.find.replacement.text = replaceTerm
	app.Selection.find.Execute,,,,,,,,,,2
End Sub

Sub ResetHTA
	ProjectName.value = ""
	ProjectContainer.value = ""
	RFANumber.Value = ""
	Revision(0).checked = false
	Revision(0).checked = false
	AgentNum.Value = ""
	RFAType.Value = null		
End Sub

Function PickFolder(strStartDir)
	Dim SA, F
	Set SA = CreateObject("Shell.Application")
	Set F = SA.BrowseForFolder(0, "Choose a folder", 0, strStartDir)
	If (Not F Is Nothing) Then
	  PickFolder = F.Items.Item.path
	End If
	Set F = Nothing
	Set SA = Nothing
End Function

Sub RunBatch2
	Dim FSO
	Dim UserName
	Dim strFolder 
	Dim d
	'RegionalOffice = "Chatsworth"
	RegionalOffice = "Conyers"
	'RegionalOffice = "Chicago"
	

	Set objFSO = CreateObject("Scripting.FileSystemObject")
	Set objNetwork = CreateObject("WScript.Network")
	Set os = GetObject("winmgmts:root\cimv2:Win32_OperatingSystem=@")
	Year1 = Left(os.LocalDateTime, 4)' year
	Month1 = Mid(os.LocalDateTime, 5, 2)' month
	Day1 = Mid(os.LocalDateTime, 7, 2)' day
	d = (Month1 & Day1 & Year1)
	userName = objNetwork.userName
	ProjectName.Value = Replace(ProjectName.Value, "\", " ")             'Replace backslash and forward slash from project names
	ProjectName.Value = Replace(ProjectName.Value, "/", " ")
	ProjectName.Value = UCase(ProjectName.Value)                         'Make the project name all caps

	
	Select Case RegionalOffice 
	'---------Chatsworth Specific File Locations---------
	Case "Chatsworth" 
		MasterTemplateFolder = "U:\!!!Templates For Project Creator"
		CurrentYearFolder = "Z:\"
		PrevYearFolder = "Y:\"
		secyrFolder = "X:\"
		NationalAccountSave = "Z:\"
		FileDirectory = "Z:\"
	'---------Conyers Specific File Locations---------
	Case "Conyers"
		MasterTemplateFolder = "K:\Projects\!!!Templates For Project Creator"
		CurrentYearFolder = "K:\Projects\"& Year1 & " Projects\"
		PrevYearFolder = "K:\Projects\"& Year1 -1 & " Projects\"
		secyrFolder = "K:\Projects\"& Year1 -2 & " Projects\"
		NationalAccountSave = "K:\Projects\Corporate Accounts\"
		FileDirectory = "K:\Projects\"
	'---------Chicago Specific File Locations---------
	Case "Chicago"
		MasterTemplateFolder = "\\mdc-file\Common\MWDC DAS\Projects\!!!Templates For Project Creator"
		CurrentYearFolder = "\\mdc-file\Common\MWDC DAS\Projects\" & Year1
		PrevYearFolder = "\\mdc-file\Common\MWDC DAS\Projects\" & Year1 -1
		secyrFolder =  "\\mdc-file\Common\MWDC DAS\Projects\" & Year1 -2
		NationalAccountSave = CurrentYearFolder
		FileDirectory = "\\mdc-file\Common\MWDC DAS\Projects\"
	Case Else
		alert "No Regional Office Selected"
		self.close
	end Select

	RelocTemplateFolder = "\RELOC-RFA#_TYPE_MMDDYYYY"
	RelocProjectTemplate = MasterTemplateFolder & RelocTemplateFolder
	LCDPreprogrammingTemplate = MasterTemplateFolder & "\LCD"
	AgencyRequirements = MasterTemplateFolder & "\Agent Requirements\"
	RFAAuditLog = MasterTemplateFolder & "\RFA Audit Log.docx"
	ControlsProjectTemplate = MasterTemplateFolder & "\RFA#_TYPE_MMDDYYYY"
	NATemplates = "K:\Projects\Corporate Accounts\"

	if NOT NA.Value = "Default" then
		if instr(1,NA.Value,"Target_EN",1) then
			ControlsProjectTemplate = NATemplates & "Target\!Target Express-New Store - Template Folder" & "\RFA#_TYPE_MMDDYYYY"
		elseif instr(1,NA.Value,"Target_R",1) then
			ControlsProjectTemplate = NATemplates & "Target\!Target Remodel - Template Folder" & "\RFA#_TYPE_MMDDYYYY"
		else
			ControlsProjectTemplate = NATemplates & NA.Value & "\!" & NA.Value & " - Template Folder" & "\RFA#_TYPE_MMDDYYYY"
		end if
	end if

	If NOT objFSO.FolderExists(ControlsProjectTemplate) then   
		alert "Error: Template folder location does not exist: " & ControlsProjectTemplate
		exit sub
	end if

	For Each objButton in Revision 
            If objButton.Checked Then 
                newold = objButton.Value 
            End If 
        Next

	Select Case SaveLocation.value
	Case "Triage"
		IF objFSO.FolderExists("C:\Users\" & userName & "\Desktop\1) Triage") = FALSE THEN
			objFSO.CreateFolder "C:\Users\" & userName & "\Desktop\1) Triage"
		end if
		BaseSave = "C:\Users\" & userName & "\Desktop\1) Triage\"
	Case "Server"
		FirstLetter = Left(ProjectName.Value, 1)
		if NOT NA.Value = "Default" then
			if instr(1, NA.Value, "Target", 1) then
				initialSave = NationalAccountSave & "\Target\"
			else
				initialSave = NationalAccountSave & NA.Value & "\"
			end if
			BaseSave = initialSave
			If RegionalOffice = "Chatsworth" then
				BaseSave = NationalAccountSave & FirstLetter & "\" & NA.Value & "\"
				IF objFSO.FolderExists(NationalAccountSave & FirstLetter & "\" & NA.Value) = FALSE THEN
					objFSO.CreateFolder NationalAccountSave & FirstLetter & "\" & NA.Value
				end if
			end if
		else	
			If instr(1, "ABCDEFGHIJKLMNOPQRSTUVWXYZ", FirstLetter, 1) = 0 Then
				FirstLetter = "#"
			end if
			BaseSave = CurrentYearFolder & FirstLetter & "\"
			If (not ("2" = newold)) then
				ProjectYear = "20" & Left(ProjectContainer.Value, 2)
				Yearselect = ProjectYear - Year1 
				Select Case Yearselect
				Case "-1"
					BaseSave = PrevYearFolder & FirstLetter & "\"
				Case "-2"
					BaseSave = secyrFolder & FirstLetter & "\"
				Case else
					BaseSave = CurrentYearFolder & FirstLetter & "\"
				end select
			end if	
		end if
	Case else
		BaseSave = "C:\Users\" & userName & "\Desktop\"
	end Select

	strFolder = BaseSave & ProjectName.value & "_" & ProjectContainer.Value
	
'------Creates a Revision--------------	
	If "2" = newold then
		'------Creates a Revision on Server--------------
		If "Server" = SaveLocation.value then
			If objFSO.FolderExists(strFolder) = False then
				If objFSO.FolderExists(PrevYearFolder & FirstLetter & "\" & ProjectName.value & "_" & ProjectContainer.Value) = False then
					If objFSO.FolderExists(secyrFolder & FirstLetter & "\" & ProjectName.value & "_" & ProjectContainer.Value) = False then
						Alert "Error: Previous revision folder not found. Manually select RFA folder."
						strStartDir = FileDirectory
						userselections = PickFolder(strStartDir)
						if userselections = "" then
							alert "No folder selected. No new folder has been created."
							Exit sub
						else
							strFolder = userselections
						end if
					else
						strfolder = secyrFolder & FirstLetter & "\" & ProjectName.value & "_" & ProjectContainer.Value
					end if
				else
					strfolder = PrevYearFolder & FirstLetter & "\" & ProjectName.value & "_" & ProjectContainer.Value
				end if
			end if

			IF objFSO.FolderExists(strFolder & "\RFA#" & RFANumber.Value & "_" & RFAType.value & "_" & d) = FALSE Then
				objFSO.CreateFolder (strFolder & "\RFA#" & RFANumber.Value & "_" & RFAType.value & "_" & d)
				objFSO.CreateFolder (strFolder & "\RFA#" & RFANumber.Value & "_" & RFAType.value & "_" & d & "\!Agent Files")
				objFSO.CreateFolder (strFolder & "\RFA#" & RFANumber.Value & "_" & RFAType.value & "_" & d & "\!!Request Output")
				objFSO.CopyFolder ControlsProjectTemplate & "\BOM CHECK", strFolder & "\RFA#" & RFANumber.Value & "_" & RFAType.value & "_" & d & "\"
			Else
				Alert "Error: Revision folder exists on the Server for this RFA"
			end if

			
		'------Creates a Revision on Desktop or Triage Folder--------------
		else
			IF objFSO.FolderExists(BaseSave & "\RFA#" & RFANumber.Value & "_" & RFAType.value & "_" & d) = FALSE Then
				objFSO.CreateFolder (BaseSave & "\RFA#" & RFANumber.Value & "_" & RFAType.value & "_" & d)
				objFSO.CreateFolder (BaseSave & "\RFA#" & RFANumber.Value & "_" & RFAType.value & "_" & d & "\!Agent Files")
				objFSO.CreateFolder (BaseSave & "\RFA#" & RFANumber.Value & "_" & RFAType.value & "_" & d & "\!!Request Output")
				objFSO.CopyFolder ControlsProjectTemplate & "\BOM CHECK", BaseSave & "\RFA#" & RFANumber.Value & "_" & RFAType.value & "_" & d & "\"
	
			Else
				Alert "Error: Revision folder exists"
			end if
		end if
		
	else
'------Creates a New Blank Project Folder--------------		
		
		IF objFSO.FolderExists(strFolder) = FALSE THEN
			objFSO.CreateFolder strFolder
			If "RelocBOM" = RFAType.value or "RelocSUB" = RFAType.value then                                                                           'create reloc folders
				If objFSO.FolderExists(RelocProjectTemplate) Then
					objFSO.CopyFolder RelocProjectTemplate, strfolder & "\"
					objFSO.MoveFolder strfolder & RelocTemplateFolder, strfolder & "\RFA#" & RFANumber.Value & "_" & RFAType.value & "_" & d
				end if
			else
				If objFSO.FolderExists(ControlsProjectTemplate) Then                                             'create all other folders
					objFSO.CopyFolder ControlsProjectTemplate, strfolder & "\"
					objFSO.MoveFolder strfolder & "\RFA#_TYPE_MMDDYYYY", strfolder & "\RFA#" & RFANumber.Value & "_" & RFAType.value & "_" & d
					set oFldr = objFSO.getfolder(strfolder & "\RFA#" & RFANumber.Value & "_" & RFAType.value & "_" & d)
					for each ofile in oFldr.Files
  						if lcase(objFSO.GetExtensionName(ofile.Name)) = "vsp" then
    							objFSO.MoveFile ofile.Path, ofile.ParentFolder & "\ABC_" & ProjectName.value & "_" & RFAType.value & " ORIG_" & d & ".vsp"
    							Exit for
  						end if
					Next
				end if
			end if
'------------Adds additional documents for Preprogramming--------
			
			If "RELEASE" = RFAType.value and LCDPreprogrammingTemplate <> "NA" then									
				If objFSO.FolderExists(LCDPreprogrammingTemplate) Then
					objFSO.CopyFolder LCDPreprogrammingTemplate, oFldr & "\"
				else
					Alert "Error: LC&D Template not found. Please manually add pertinent documentation"
				end if
			End If			
		ELSE
			Alert "Error: Previous Folder already created. This should be a revision."
			exit sub
		END IF
END IF
	Set openFolderShell = CreateObject("Shell.Application")	
	If "Server" = SaveLocation.value then
		openFolderShell.ShellExecute strfolder & "\RFA#" & RFANumber.Value & "_" & RFAType.value & "_" & d & "\!Agent Files"
	else
		If "2" = newold then
			openFolderShell.ShellExecute BaseSave & "\RFA#" & RFANumber.Value & "_" & RFAType.value & "_" & d & "\!Agent Files"
		else
			openFolderShell.ShellExecute strfolder & "\RFA#" & RFANumber.Value & "_" & RFAType.value & "_" & d & "\!Agent Files"
		end if
	end if

'----------Create Shortcuts if not in the most recent folder------------
	If SaveLocation.value = "Server" then
		IF strfolder <> CurrentYearFolder & FirstLetter & "\" & ProjectName.value & "_" & ProjectContainer.Value then
			Set shortcut = CreateObject("WScript.Shell").CreateShortcut(CurrentYearFolder & FirstLetter & "\" & ProjectName.value & "_" & ProjectContainer.Value & ".lnk")
			shortcut.Description = "Shortcut to initial revision"
			shortcut.TargetPath = strfolder & "\"
			shortcut.Save
		end if
	end if

'----------Open/ Edit Design Notes and Assumptions document.--------
	IF "2" <> newold THEN
		If objFSO.FileExists(strfolder & "\RFA#" & RFANumber.Value & "_" & RFAType.value & "_" & d & "\AE Markups\Design Notes and Assumptions.docx")then
			Set appWord = CreateObject("Word.Application")  
			appWord.Visible = False 
			appWord.Documents.Add
			appWord.Documents.Open(strfolder & "\RFA#" & RFANumber.Value & "_" & RFAType.value & "_" & d & "\AE Markups\Design Notes and Assumptions.docx")
		   
			strprojectname = "PROJECT NAME: " & ProjectName.value
			strprojectcont = "PROJECT CONTAINER: " & ProjectContainer.Value
			strrfa = "RFA #: " & RFANumber.Value
			Const wdStory = 6
			Const wdMove = 0
			agentrequire = AgencyRequirements & AgentNum.Value & ".docx"
			Set objSelection = appword.Selection
			'objSelection.EndKey wdStory, wdMove
			objSelection.TypeParagraph()
			If objFSO.FileExists(agentrequire) Then
				objSelection.InsertFile(agentrequire)
			else
				objSelection.InsertFile(AgencyRequirements & "General.docx")
			end if

			SearchAndRepHeader "PROJECT NAME:", strprojectname, appWord
			SearchAndRepHeader "PROJECT CONTAINER:", strprojectcont, appWord
			SearchAndRepHeader "RFA #:", strrfa, appWord

			SearchAndRep "PROJECT NAME:", strprojectname, appWord
			SearchAndRep "PROJECT CONTAINER:", strprojectcont, appWord
			SearchAndRep "RFA #:", strrfa, appWord    
			appword.Application.Quit(-1)
		else
			Alert "Error: Design and Assumption notes are missing. Please Manually add them in."	
		end if
	END IF
	
'-----Add/ Edit RFA Audit Log-----
	If "Server" = SaveLocation.value or "2" <> newold then	
		missingaudit = 0
		If objFSO.FileExists(strfolder & "\RFA Audit Log.docx") = false then
			objFSO.CopyFile RFAAuditLog, strfolder & "\"
			missingaudit = 1
		end if 
		Set app2Word = CreateObject("Word.Application")
		app2Word.Visible = False 
		app2Word.Documents.Add
		Set doc = app2Word.Documents.Open(strfolder & "\RFA Audit Log.docx")
		Set r = doc.Tables(1).Rows.Add
		r.cells(r.Cells.Count - 3).Range.Text = "RFA#" & RFANumber.Value & " " & RFAType.value
		r.cells(r.Cells.Count - 2).Range.Text = Month1 & "/" & Day1 & "/" & Year1
		strprojectname2 = "PROJECT NAME: " & ProjectName.value
		strprojectcont2 = "PROJECT CONTAINER: " & ProjectContainer.Value
		If missingaudit = 1 then
			SearchAndRep "Project Name: ", strprojectname2, app2Word
			SearchAndRep "Project Container: ", strprojectcont2, app2Word
		end if
		app2word.Application.Quit(-1)
	end if

'-----Export Info to Triage Tool-----
	if TriageOpen(0).checked then
		Set appExcel = CreateObject("Excel.Application")  
		Set appWorkbook = appExcel.Workbooks.Open("C:\Users\" & userName & "\Desktop\TRIAGE TOOL 4.xlsm")
		appExcel.Application.Visible = True
		appWorkbook.RunAutoMacros(1)	
		appExcel.Run "HEADERINFO"
	end if	

'-----Close/ Reset App--------------	
	For Each objButton in KeepOpen 
		If objButton.Checked Then 
			CloseApp = objButton.Value 
		End If 
	Next
	if CloseApp = "2" then
		Self.close
	else
		ResetHTA
	end if

End Sub

    

Sub ImportRFAInfo
	
	Result = Clipboard(Null)
	ShortenedRFAInfo = Result
	ShortenedRFAInfo = Replace(ShortenedRFAInfo, "Rep:  ", ",,")

'RFA Types
	ShortenedRFAInfo = Replace(ShortenedRFAInfo, "- Controls Submittal - Submittal", ",,SUBMITTAL,,")
	ShortenedRFAInfo = Replace(ShortenedRFAInfo, "- Lithonia Commercial Indoor / Controls Submittal - Submittal", ",,SUBMITTAL,,")
	ShortenedRFAInfo = Replace(ShortenedRFAInfo, "- Controls Submittal - One-Line Diagram", ",,SUBMITTAL,,")
	ShortenedRFAInfo = Replace(ShortenedRFAInfo, "- Controls Submittal - Record Submittal", ",,SUBMITTAL,,")
	ShortenedRFAInfo = Replace(ShortenedRFAInfo, "- Controls Submittal - Preprogramming", ",,RELEASE,,")
	ShortenedRFAInfo = Replace(ShortenedRFAInfo, "- Controls BOM - BOM (No Layout)", ",,BOM,,")
	ShortenedRFAInfo = Replace(ShortenedRFAInfo, "- Controls BOM - Budget", ",,BUDGET,,")
	ShortenedRFAInfo = Replace(ShortenedRFAInfo, "- Controls BOM - BOM (With Layout)", ",,LAYOUT,,")
	ShortenedRFAInfo = Replace(ShortenedRFAInfo, "- Controls Design - Layout", ",,LAYOUT,,")
	ShortenedRFAInfo = Replace(ShortenedRFAInfo, "- Lithonia Reloc BOM - Budget", ",,RelocBOM,,")
	ShortenedRFAInfo = Replace(ShortenedRFAInfo, "- Lithonia Reloc BOM - BOM (With Layout)", ",,RelocBOM,,")
	ShortenedRFAInfo = Replace(ShortenedRFAInfo, "- Lithonia Reloc Submittal - Submittal", ",,RelocSUB,,")
	ShortenedRFAInfo = Replace(ShortenedRFAInfo, "- Lithonia Reloc / Controls Submittal - Submittal", ",,RelocControlsSUB,,")
	ShortenedRFAInfo = Replace(ShortenedRFAInfo, "- Controls Post-Installation - Graphical Interface", ",,GRAPHICS,,")
	ShortenedRFAInfo = Replace(ShortenedRFAInfo, "- Atrius BOM - BOM (No Layout)", ",,AtriusBOM,,")
	ShortenedRFAInfo = Replace(ShortenedRFAInfo, "- Atrius BOM - BOM (With Layout)", ",,AtriusLayout,,")
	ShortenedRFAInfo = Replace(ShortenedRFAInfo, "- Atrius Submittal - Submittal", ",,AtriusSub,,")

	ShortenedRFAInfo = Replace(ShortenedRFAInfo, "Request for Assistance ", ",,")
	ShortenedRFAInfo = Replace(ShortenedRFAInfo, "ECD: ", ",,")
	ShortenedRFAInfo = Replace(ShortenedRFAInfo, "Requested Date:", ",,")
	ShortenedRFAInfo = Replace(ShortenedRFAInfo, "Version:", ",,")
	ShortenedRFAInfo = Replace(ShortenedRFAInfo, "Submitted Date:", ",,")

	'RFANumber.Value = ShortenedRFAInfo
	RFAInfo = Split(ShortenedRFAInfo, ",,", -1)
	RFANumber.Value = Replace(RFAInfo(1)," ","",1,-1)
	RFAType.Value = RFAInfo(2)
	AgentNum.Value = Replace(RFAInfo(4)," ","",1,-1)
	'AgentNum.Value = RFAInfo(4)
	Name = RFAInfo(3) 'Both Project Name/ Project Container
	PProjectnumber = Split(Name, " ", -1)
	proj = UBound(PProjectnumber)
	ProjectContainer.Value = PProjectnumber(proj-2)
	x = proj-3
	For a = 3 to x
		Projectnam = Projectnam + " " + PProjectnumber(a)
	Next
	Projectnam = Right(Projectnam, Len(Projectnam)-1)
	ProjectName.Value = Projectnam
	Rev = Right(RFAInfo(1), 2)
	if Rev = "0 " then
		Revision(0).checked = true
	else
		Revision(1).checked = true
	end if
	ProjectRD = RFAInfo(8)
	RD.value = Right(ProjectRD, Len(ProjectRD)-1)
	ProjectECD = RFAInfo(5)
	ECD.value = Right(ProjectECD, Len(ProjectECD)-1)
	NA.Value = CheckNA(Projectnam)
End Sub

Sub TriageTime
msgbox "it worked"
End Sub

function CheckNA(name)
	CheckNA = "Default"
	' all checks are case insensitive
	if (instr(1, name, "Arby's", 1) or instr(1, name, "Arbys", 1))  then
		CheckNA = "ARBYS"
	elseif instr(1, name, "Bealls", 1) then
		CheckNA = "BEALLS"
	elseif (instr(1, name, "Chick-", 1) or instr(1, name, "Chick ", 1)) then
		CheckNA = "CHICK FIL A"
	elseif instr(1, name, "CHIPOTLE", 1) then
		CheckNA = "CHIPOTLE"
	elseif instr(1, name, "Dave & buster", 1) then
		CheckNA = "DAVE AND BUSTERS"
	elseif instr(1, name, "Davita", 1) then
		CheckNA = "DAVITA"
	elseif instr(1, name, "Drive Shack", 1) then
		CheckNA = "DRIVE SHACK"
	elseif instr(1, name, "Drybar", 1) then
		CheckNA = "DRYBAR"
	elseif instr(1, name, "Floor & Dec", 1) then
		CheckNA = "FLOOR AND DECOR"
	elseif instr(1, name, "FMC ", 1) then
		CheckNA = "FMC"
	elseif (instr(1, name, "Home Depot", 1) or instr(1, name, "THD Canada", 1)) then
		CheckNA = "HOME DEPOT"
	elseif instr(1, name, "Inplant office", 1) then
		CheckNA = "INPLANT OFFICE"
	elseif (instr(1, name, "Levi's", 1) or instr(1, name, "Levis", 1)) then
		CheckNA = "LEVIS"
	elseif instr(1, name, "Office Depot", 1) then
		CheckNA = "OFFICE DEPOT"
	elseif instr(1, name, "Pottery Barn", 1) then
		CheckNA = "POTTERY BARN"
	elseif (instr(1, name, "Flight", 1)>0 and instr(1, name, "Remodel", 1)>0) then
		CheckNA = "TARGET_R"
	elseif (instr(1, name, "Target", 1)>0 and (instr(1, name, "Express", 1) or instr(1, name, "New", 1))) then
		CheckNA = "TARGET_EN"
	elseif instr(1, name, "Bealls", 1) then
		CheckNA = "TD AMERITRADE"
	elseif instr(1, name, "West Elm", 1) then
		CheckNA = "WEST ELM"
		
	end if
	
end function

Function ClipBoard(input)
	If IsNull(input) Then
		ClipBoard = CreateObject("HTMLFile").parentWindow.clipboardData.getData("Text")
		If IsNull(ClipBoard) Then ClipBoard = ""
  	Else
		CreateObject("WScript.Shell").Run _
		"mshta.exe javascript:eval(""document.parentWindow.clipboardData.setData('text','" _
		& Replace(Replace(Replace(input, "'", "\\u0027"), """","\\u0022"),Chr(13),"\\r\\n") & "');window.close()"")", _
		0,True
	End If
End Function



