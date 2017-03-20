<?php ?>
<!DOCTYPE html>
<htmL>
<head>
    <title>SASS In The Browser</title>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="themes/SuiteP/css/style.css">
    <link rel="stylesheet" href="css/farbtastic.css">
    <link rel="stylesheet" href="css/jquery-ui.min.css">
    <style>
        .color-preview {
            height: 64px;
            width: 64px;
            display: inline-block;
        }

        #picker {
            display: inline-block;
        }

        .source-container textarea {
            min-height: 200px;
        }

        .source-container textarea {
            min-height: 100px;
        }

        .navbar-inverse {
            background-color: #534D64;
            border-bottom-color: #534D64;
            min-height: 62px;
        }

        .navbar-nav > li > a {
            padding-top: 31px;
            padding-bottom: 31px;
        }

        .navbar-brand {
            padding-top: 31px;
            padding-bottom: 31px;
        }

        .main-container {
            margin-top: 96px;
        }

        .navbar-inverse .navbar-nav > .active > a,
        .navbar-inverse .navbar-nav > .active > a:focus,
        .navbar-inverse .navbar-nav > .active > a:hover {
            background-color: #4b3b76;
        }
    </style>
    <script src="js/jquery-3.1.1.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/jquery-ui.min.js"></script>
    <script src="js/farbtastic.js"></script>
    <script src="dist/sass.js"></script>
    <script src="js/sugar/themes/builder.js"></script>
    <script src="js/sass-theme-editor.js"></script>
</head>
<body>
<div id="ajaxHeader">
    <!--Start Responsive Top Navigation Menu -->
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="dropdown">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <ul class="dropdown-menu mobile_menu" role="menu" id="mobile_menu">
                    <li role="presentation" data-test="1">
                        <a href="javascript:void(0)"
                           onclick="window.location.href = '?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DHome%26action%3Dindex%26parentTab%3DAll'">
                            Home
                        </a>
                    </li>
                    <li role="presentation" data-test="1">
                        <a href="javascript:void(0)"
                           onclick="window.location.href = '?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DAccounts%26action%3Dindex%26parentTab%3DAll'">
                            Accounts
                            <span class="glyphicon glyphicon-plus"
                                  onclick="window.location.href = 'index.php?action=EditView&amp;module=Accounts'"></span>
                        </a>
                    </li>
                    <li role="presentation" data-test="1">
                        <a href="javascript:void(0)"
                           onclick="window.location.href = '?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DContacts%26action%3Dindex%26parentTab%3DAll'">
                            Contacts
                            <span class="glyphicon glyphicon-plus"
                                  onclick="window.location.href = 'index.php?action=EditView&amp;module=Contacts'"></span>
                        </a>
                    </li>
                    <li role="presentation" data-test="1">
                        <a href="javascript:void(0)"
                           onclick="window.location.href = '?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DOpportunities%26action%3Dindex%26parentTab%3DAll'">
                            Opportunities
                            <span class="glyphicon glyphicon-plus"
                                  onclick="window.location.href = 'index.php?action=EditView&amp;module=Opportunities'"></span>
                        </a>
                    </li>
                    <li role="presentation" data-test="1">
                        <a href="javascript:void(0)"
                           onclick="window.location.href = '?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DLeads%26action%3Dindex%26parentTab%3DAll'">
                            Leads
                            <span class="glyphicon glyphicon-plus"
                                  onclick="window.location.href = 'index.php?action=EditView&amp;module=Leads'"></span>
                        </a>
                    </li>
                    <li role="presentation" data-test="1">
                        <a href="javascript:void(0)"
                           onclick="window.location.href = '?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DAOS_Quotes%26action%3Dindex%26parentTab%3DAll'">
                            Quotes
                            <span class="glyphicon glyphicon-plus"
                                  onclick="window.location.href = 'index.php?action=EditView&amp;module=AOS_Quotes'"></span>
                        </a>
                    </li>
                    <li role="presentation" data-test="1">
                        <a href="javascript:void(0)"
                           onclick="window.location.href = 'index.php?module=Calendar&amp;action=index&amp;parentTab=All'">
                            Calendar
                        </a>
                    </li>
                    <li role="presentation" data-test="1">
                        <a href="javascript:void(0)"
                           onclick="window.location.href = 'index.php?module=Documents&amp;action=index&amp;parentTab=All'">
                            Documents
                            <span class="glyphicon glyphicon-plus"
                                  onclick="window.location.href = 'index.php?action=EditView&amp;module=Documents'"></span>
                        </a>
                    </li>
                    <li role="presentation" data-test="1">
                        <a href="javascript:void(0)"
                           onclick="window.location.href = 'index.php?module=Emails&amp;action=index&amp;parentTab=All'">
                            Emails
                            <span class="glyphicon glyphicon-plus"
                                  onclick="window.location.href = 'index.php?action=EditView&amp;module=Emails'"></span>
                        </a>
                    </li>
                    <li role="presentation" data-test="1">
                        <a href="javascript:void(0)"
                           onclick="window.location.href = '?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DSpots%26action%3Dindex%26parentTab%3DAll'">
                            Spots
                            <span class="glyphicon glyphicon-plus"
                                  onclick="window.location.href = 'index.php?action=EditView&amp;module=Spots'"></span>
                        </a>
                    </li>
                    <li role="presentation" data-test="2">
                        <a href="javascript:void(0)"
                           onclick="window.location.href = 'index.php?module=Campaigns&amp;action=index&amp;parentTab=All'">
                            Campaigns
                            <span class="glyphicon glyphicon-plus"
                                  onclick="window.location.href = 'index.php?action=EditView&amp;module=Campaigns'"></span>
                        </a>
                    </li>
                    <li role="presentation" data-test="2">
                        <a href="javascript:void(0)"
                           onclick="window.location.href = '?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DCalls%26action%3Dindex%26parentTab%3DAll'">
                            Calls
                            <span class="glyphicon glyphicon-plus"
                                  onclick="window.location.href = 'index.php?action=EditView&amp;module=Calls'"></span>
                        </a>
                    </li>
                    <li role="presentation" data-test="2">
                        <a href="javascript:void(0)"
                           onclick="window.location.href = '?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DMeetings%26action%3Dindex%26parentTab%3DAll'">
                            Meetings
                            <span class="glyphicon glyphicon-plus"
                                  onclick="window.location.href = 'index.php?action=EditView&amp;module=Meetings'"></span>
                        </a>
                    </li>
                    <li role="presentation" data-test="2">
                        <a href="javascript:void(0)"
                           onclick="window.location.href = '?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DTasks%26action%3Dindex%26parentTab%3DAll'">
                            Tasks
                            <span class="glyphicon glyphicon-plus"
                                  onclick="window.location.href = 'index.php?action=EditView&amp;module=Tasks'"></span>
                        </a>
                    </li>
                    <li role="presentation" data-test="2">
                        <a href="javascript:void(0)"
                           onclick="window.location.href = '?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DNotes%26action%3Dindex%26parentTab%3DAll'">
                            Notes
                            <span class="glyphicon glyphicon-plus"
                                  onclick="window.location.href = 'index.php?action=EditView&amp;module=Notes'"></span>
                        </a>
                    </li>
                    <li role="presentation" data-test="2">
                        <a href="javascript:void(0)"
                           onclick="window.location.href = '?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DAOS_Invoices%26action%3Dindex%26parentTab%3DAll'">
                            Invoices
                            <span class="glyphicon glyphicon-plus"
                                  onclick="window.location.href = 'index.php?action=EditView&amp;module=AOS_Invoices'"></span>
                        </a>
                    </li>
                    <li role="presentation" data-test="2">
                        <a href="javascript:void(0)"
                           onclick="window.location.href = '?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DAOS_Contracts%26action%3Dindex%26parentTab%3DAll'">
                            Contracts
                            <span class="glyphicon glyphicon-plus"
                                  onclick="window.location.href = 'index.php?action=EditView&amp;module=AOS_Contracts'"></span>
                        </a>
                    </li>
                    <li role="presentation" data-test="2">
                        <a href="javascript:void(0)"
                           onclick="window.location.href = '?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DCases%26action%3Dindex%26parentTab%3DAll'">
                            Cases
                            <span class="glyphicon glyphicon-plus"
                                  onclick="window.location.href = 'index.php?action=EditView&amp;module=Cases'"></span>
                        </a>
                    </li>
                    <li role="presentation" data-test="2">
                        <a href="javascript:void(0)"
                           onclick="window.location.href = '?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DProspects%26action%3Dindex%26parentTab%3DAll'">
                            Targets
                            <span class="glyphicon glyphicon-plus"
                                  onclick="window.location.href = 'index.php?action=EditView&amp;module=Prospects'"></span>
                        </a>
                    </li>
                    <li role="presentation" data-test="2">
                        <a href="javascript:void(0)"
                           onclick="window.location.href = '?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DProspectLists%26action%3Dindex%26parentTab%3DAll'">
                            Target Lists
                            <span class="glyphicon glyphicon-plus"
                                  onclick="window.location.href = 'index.php?action=EditView&amp;module=ProspectLists'"></span>
                        </a>
                    </li>
                    <li role="presentation" data-test="2">
                        <a href="javascript:void(0)"
                           onclick="window.location.href = 'index.php?module=Project&amp;action=index&amp;parentTab=All'">
                            Projects
                            <span class="glyphicon glyphicon-plus"
                                  onclick="window.location.href = 'index.php?action=EditView&amp;module=Project'"></span>
                        </a>
                    </li>
                    <li role="presentation" data-test="2">
                        <a href="javascript:void(0)"
                           onclick="window.location.href = '?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DAM_ProjectTemplates%26action%3Dindex%26parentTab%3DAll'">
                            Project Templates
                            <span class="glyphicon glyphicon-plus"
                                  onclick="window.location.href = 'index.php?action=EditView&amp;module=AM_ProjectTemplates'"></span>
                        </a>
                    </li>
                    <li role="presentation" data-test="2">
                        <a href="javascript:void(0)"
                           onclick="window.location.href = '?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DFP_events%26action%3Dindex%26parentTab%3DAll'">
                            Events
                            <span class="glyphicon glyphicon-plus"
                                  onclick="window.location.href = 'index.php?action=EditView&amp;module=FP_events'"></span>
                        </a>
                    </li>
                    <li role="presentation" data-test="2">
                        <a href="javascript:void(0)"
                           onclick="window.location.href = '?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DFP_Event_Locations%26action%3Dindex%26parentTab%3DAll'">
                            Locations
                            <span class="glyphicon glyphicon-plus"
                                  onclick="window.location.href = 'index.php?action=EditView&amp;module=FP_Event_Locations'"></span>
                        </a>
                    </li>
                    <li role="presentation" data-test="2">
                        <a href="javascript:void(0)"
                           onclick="window.location.href = '?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DAOS_Products%26action%3Dindex%26parentTab%3DAll'">
                            Products
                            <span class="glyphicon glyphicon-plus"
                                  onclick="window.location.href = 'index.php?action=EditView&amp;module=AOS_Products'"></span>
                        </a>
                    </li>
                    <li role="presentation" data-test="2">
                        <a href="javascript:void(0)"
                           onclick="window.location.href = '?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DAOS_Product_Categories%26action%3Dindex%26parentTab%3DAll'">
                            Product Categories
                            <span class="glyphicon glyphicon-plus"
                                  onclick="window.location.href = 'index.php?action=EditView&amp;module=AOS_Product_Categories'"></span>
                        </a>
                    </li>
                    <li role="presentation" data-test="2">
                        <a href="javascript:void(0)"
                           onclick="window.location.href = '?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DAOS_PDF_Templates%26action%3Dindex%26parentTab%3DAll'">
                            PDF Templates
                            <span class="glyphicon glyphicon-plus"
                                  onclick="window.location.href = 'index.php?action=EditView&amp;module=AOS_PDF_Templates'"></span>
                        </a>
                    </li>
                    <li role="presentation" data-test="2">
                        <a href="javascript:void(0)"
                           onclick="window.location.href = '?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3Djjwg_Maps%26action%3Dindex%26parentTab%3DAll'">
                            Maps
                            <span class="glyphicon glyphicon-plus"
                                  onclick="window.location.href = 'index.php?action=EditView&amp;module=jjwg_Maps'"></span>
                        </a>
                    </li>
                    <li role="presentation" data-test="2">
                        <a href="javascript:void(0)"
                           onclick="window.location.href = '?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3Djjwg_Markers%26action%3Dindex%26parentTab%3DAll'">
                            Map Markers
                            <span class="glyphicon glyphicon-plus"
                                  onclick="window.location.href = 'index.php?action=EditView&amp;module=jjwg_Markers'"></span>
                        </a>
                    </li>
                    <li role="presentation" data-test="2">
                        <a href="javascript:void(0)"
                           onclick="window.location.href = '?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3Djjwg_Areas%26action%3Dindex%26parentTab%3DAll'">
                            Map Areas
                            <span class="glyphicon glyphicon-plus"
                                  onclick="window.location.href = 'index.php?action=EditView&amp;module=jjwg_Areas'"></span>
                        </a>
                    </li>
                    <li role="presentation" data-test="2">
                        <a href="javascript:void(0)"
                           onclick="window.location.href = '?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3Djjwg_Address_Cache%26action%3Dindex%26parentTab%3DAll'">
                            Map Address Cache
                            <span class="glyphicon glyphicon-plus"
                                  onclick="window.location.href = 'index.php?action=EditView&amp;module=jjwg_Address_Cache'"></span>
                        </a>
                    </li>
                    <li role="presentation" data-test="2">
                        <a href="javascript:void(0)"
                           onclick="window.location.href = '?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DAOR_Reports%26action%3Dindex%26parentTab%3DAll'">
                            Reports
                            <span class="glyphicon glyphicon-plus"
                                  onclick="window.location.href = 'index.php?action=EditView&amp;module=AOR_Reports'"></span>
                        </a>
                    </li>
                    <li role="presentation" data-test="2">
                        <a href="javascript:void(0)"
                           onclick="window.location.href = '?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DAOW_WorkFlow%26action%3Dindex%26parentTab%3DAll'">
                            WorkFlow
                            <span class="glyphicon glyphicon-plus"
                                  onclick="window.location.href = 'index.php?action=EditView&amp;module=AOW_WorkFlow'"></span>
                        </a>
                    </li>
                    <li role="presentation" data-test="2">
                        <a href="javascript:void(0)"
                           onclick="window.location.href = '?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DAOK_KnowledgeBase%26action%3Dindex%26parentTab%3DAll'">
                            Knowledge Base
                            <span class="glyphicon glyphicon-plus"
                                  onclick="window.location.href = 'index.php?action=EditView&amp;module=AOK_KnowledgeBase'"></span>
                        </a>
                    </li>
                    <li role="presentation" data-test="2">
                        <a href="javascript:void(0)"
                           onclick="window.location.href = '?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DAOK_Knowledge_Base_Categories%26action%3Dindex%26parentTab%3DAll'">
                            KB Categories
                            <span class="glyphicon glyphicon-plus"
                                  onclick="window.location.href = 'index.php?action=EditView&amp;module=AOK_Knowledge_Base_Categories'"></span>
                        </a>
                    </li>
                </ul>
                <div id="mobileheader" class="mobileheader">
                    <div id="modulelinks" class="modulelinks">
                                                                        <span class="modulename" data-toggle="dropdown"
                                                                              aria-expanded="false"><a
                                                                                    href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DHome%26action%3Dindex"
                                                                                    id="moduleTab_Home" module="Home">Home</a>
                            </span>

                        <ul class="dropdown-menu" role="menu">

                            <li class="recent-links-title" role="presentation">
                                <a><strong>Recently Viewed</strong></a>
                            </li>
                            <li role="presentation">
                                <ul class="recent-list">

                                </ul>
                            </li>

                        </ul>

                    </div>
                </div>
            </div>
            <div class="desktop-toolbar" id="toolbar">
                <ul class="nav navbar-nav">
                    <li class="navbar-brand-container">
                        <a class="navbar-brand with-home-icon"
                           href="index.php?module=Home&amp;action=index">SuiteCRM</a>
                    </li>

                    <li class="topnav">
                        <span class="notCurrentTabLeft">&nbsp;</span><span class="notCurrentTab">
                            <a href="#" id="grouptab_0" class="dropdown-toggle grouptab"
                               data-toggle="dropdown">Sales</a>
                            <span class="notCurrentTabRight">&nbsp;</span>
                            <ul class="dropdown-menu" role="menu">
                                                                    <li>
                                                                                <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DHome%26action%3Dindex%26parentTab%3DSales"
                                                                                   id="moduleTab_9_Home" module="Home">Home</a>
                                    </li>
                                                                    <li>
                                                                                <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DAccounts%26action%3Dindex%26parentTab%3DSales"
                                                                                   id="moduleTab_9_Accounts"
                                                                                   module="Accounts">Accounts</a>
                                    </li>
                                                                    <li>
                                                                                <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DContacts%26action%3Dindex%26parentTab%3DSales"
                                                                                   id="moduleTab_9_Contacts"
                                                                                   module="Contacts">Contacts</a>
                                    </li>
                                                                    <li>
                                                                                <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DOpportunities%26action%3Dindex%26parentTab%3DSales"
                                                                                   id="moduleTab_9_Opportunities"
                                                                                   module="Opportunities">Opportunities</a>
                                    </li>
                                                                    <li>
                                                                                <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DLeads%26action%3Dindex%26parentTab%3DSales"
                                                                                   id="moduleTab_9_Leads"
                                                                                   module="Leads">Leads</a>
                                    </li>
                                                                                            </ul>
                        </span></li>
                    <li class="topnav">
                        <span class="notCurrentTabLeft">&nbsp;</span><span class="notCurrentTab">
                            <a href="#" id="grouptab_1" class="dropdown-toggle grouptab" data-toggle="dropdown">Marketing</a>
                            <span class="notCurrentTabRight">&nbsp;</span>
                            <ul class="dropdown-menu" role="menu">
                                                                    <li>
                                                                                <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DHome%26action%3Dindex%26parentTab%3DMarketing"
                                                                                   id="moduleTab_9_Home" module="Home">Home</a>
                                    </li>
                                                                    <li>
                                                                                <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DAccounts%26action%3Dindex%26parentTab%3DMarketing"
                                                                                   id="moduleTab_9_Accounts"
                                                                                   module="Accounts">Accounts</a>
                                    </li>
                                                                    <li>
                                                                                <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DContacts%26action%3Dindex%26parentTab%3DMarketing"
                                                                                   id="moduleTab_9_Contacts"
                                                                                   module="Contacts">Contacts</a>
                                    </li>
                                                                    <li>
                                                                                <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DLeads%26action%3Dindex%26parentTab%3DMarketing"
                                                                                   id="moduleTab_9_Leads"
                                                                                   module="Leads">Leads</a>
                                    </li>
                                                                    <li>
                                                                                <a href="index.php?module=Campaigns&amp;action=index&amp;parentTab=Marketing"
                                                                                   id="moduleTab_9_Campaigns"
                                                                                   module="Campaigns">Campaigns</a>
                                    </li>
                                                                    <li>
                                                                                <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DProspects%26action%3Dindex%26parentTab%3DMarketing"
                                                                                   id="moduleTab_9_Targets"
                                                                                   module="Prospects">Targets</a>
                                    </li>
                                                                    <li>
                                                                                <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DProspectLists%26action%3Dindex%26parentTab%3DMarketing"
                                                                                   id="moduleTab_9_Target Lists"
                                                                                   module="ProspectLists">Target Lists</a>
                                    </li>
                                                                                            </ul>
                        </span></li>
                    <li class="topnav">
                        <span class="notCurrentTabLeft">&nbsp;</span><span class="notCurrentTab">
                            <a href="#" id="grouptab_2" class="dropdown-toggle grouptab"
                               data-toggle="dropdown">Support</a>
                            <span class="notCurrentTabRight">&nbsp;</span>
                            <ul class="dropdown-menu" role="menu">
                                                                    <li>
                                                                                <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DHome%26action%3Dindex%26parentTab%3DSupport"
                                                                                   id="moduleTab_9_Home" module="Home">Home</a>
                                    </li>
                                                                    <li>
                                                                                <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DAccounts%26action%3Dindex%26parentTab%3DSupport"
                                                                                   id="moduleTab_9_Accounts"
                                                                                   module="Accounts">Accounts</a>
                                    </li>
                                                                    <li>
                                                                                <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DContacts%26action%3Dindex%26parentTab%3DSupport"
                                                                                   id="moduleTab_9_Contacts"
                                                                                   module="Contacts">Contacts</a>
                                    </li>
                                                                    <li>
                                                                                <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DCases%26action%3Dindex%26parentTab%3DSupport"
                                                                                   id="moduleTab_9_Cases"
                                                                                   module="Cases">Cases</a>
                                    </li>
                                                                                            </ul>
                        </span></li>
                    <li class="topnav">
                        <span class="notCurrentTabLeft">&nbsp;</span><span class="notCurrentTab">
                            <a href="#" id="grouptab_3" class="dropdown-toggle grouptab" data-toggle="dropdown">Activities</a>
                            <span class="notCurrentTabRight">&nbsp;</span>
                            <ul class="dropdown-menu" role="menu">
                                                                    <li>
                                                                                <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DHome%26action%3Dindex%26parentTab%3DActivities"
                                                                                   id="moduleTab_9_Home" module="Home">Home</a>
                                    </li>
                                                                    <li>
                                                                                <a href="index.php?module=Calendar&amp;action=index&amp;parentTab=Activities"
                                                                                   id="moduleTab_9_Calendar"
                                                                                   module="Calendar">Calendar</a>
                                    </li>
                                                                    <li>
                                                                                <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DCalls%26action%3Dindex%26parentTab%3DActivities"
                                                                                   id="moduleTab_9_Calls"
                                                                                   module="Calls">Calls</a>
                                    </li>
                                                                    <li>
                                                                                <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DMeetings%26action%3Dindex%26parentTab%3DActivities"
                                                                                   id="moduleTab_9_Meetings"
                                                                                   module="Meetings">Meetings</a>
                                    </li>
                                                                    <li>
                                                                                <a href="index.php?module=Emails&amp;action=index&amp;parentTab=Activities"
                                                                                   id="moduleTab_9_Emails"
                                                                                   module="Emails">Emails</a>
                                    </li>
                                                                    <li>
                                                                                <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DTasks%26action%3Dindex%26parentTab%3DActivities"
                                                                                   id="moduleTab_9_Tasks"
                                                                                   module="Tasks">Tasks</a>
                                    </li>
                                                                    <li>
                                                                                <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DNotes%26action%3Dindex%26parentTab%3DActivities"
                                                                                   id="moduleTab_9_Notes"
                                                                                   module="Notes">Notes</a>
                                    </li>
                                                                                            </ul>
                        </span></li>
                    <li class="topnav">
                        <span class="notCurrentTabLeft">&nbsp;</span><span class="notCurrentTab">
                            <a href="#" id="grouptab_4" class="dropdown-toggle grouptab" data-toggle="dropdown">Collaboration</a>
                            <span class="notCurrentTabRight">&nbsp;</span>
                            <ul class="dropdown-menu" role="menu">
                                                                    <li>
                                                                                <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DHome%26action%3Dindex%26parentTab%3DCollaboration"
                                                                                   id="moduleTab_9_Home" module="Home">Home</a>
                                    </li>
                                                                    <li>
                                                                                <a href="index.php?module=Emails&amp;action=index&amp;parentTab=Collaboration"
                                                                                   id="moduleTab_9_Emails"
                                                                                   module="Emails">Emails</a>
                                    </li>
                                                                    <li>
                                                                                <a href="index.php?module=Documents&amp;action=index&amp;parentTab=Collaboration"
                                                                                   id="moduleTab_9_Documents"
                                                                                   module="Documents">Documents</a>
                                    </li>
                                                                    <li>
                                                                                <a href="index.php?module=Project&amp;action=index&amp;parentTab=Collaboration"
                                                                                   id="moduleTab_9_Projects"
                                                                                   module="Project">Projects</a>
                                    </li>
                                                                                            </ul>
                        </span></li>
                    <li class="topnav all">
                        <span class="notCurrentTabLeft">&nbsp;</span><span class="notCurrentTab">
                            <a href="#" id="grouptab_5" class="dropdown-toggle grouptab" data-toggle="dropdown">All</a>
                            <span class="notCurrentTabRight">&nbsp;</span>
                            <ul class="dropdown-menu" role="menu">
                                                                    <li>
                                                                                <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DHome%26action%3Dindex%26parentTab%3DAll"
                                                                                   id="moduleTab_9_Home" module="Home">Home</a>
                                    </li>
                                                                    <li>
                                                                                <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DAccounts%26action%3Dindex%26parentTab%3DAll"
                                                                                   id="moduleTab_9_Accounts"
                                                                                   module="Accounts">Accounts</a>
                                    </li>
                                                                    <li>
                                                                                <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DContacts%26action%3Dindex%26parentTab%3DAll"
                                                                                   id="moduleTab_9_Contacts"
                                                                                   module="Contacts">Contacts</a>
                                    </li>
                                                                    <li>
                                                                                <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DOpportunities%26action%3Dindex%26parentTab%3DAll"
                                                                                   id="moduleTab_9_Opportunities"
                                                                                   module="Opportunities">Opportunities</a>
                                    </li>
                                                                    <li>
                                                                                <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DLeads%26action%3Dindex%26parentTab%3DAll"
                                                                                   id="moduleTab_9_Leads"
                                                                                   module="Leads">Leads</a>
                                    </li>
                                                                    <li>
                                                                                <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DAOS_Quotes%26action%3Dindex%26parentTab%3DAll"
                                                                                   id="moduleTab_9_Quotes"
                                                                                   module="AOS_Quotes">Quotes</a>
                                    </li>
                                                                    <li>
                                                                                <a href="index.php?module=Calendar&amp;action=index&amp;parentTab=All"
                                                                                   id="moduleTab_9_Calendar"
                                                                                   module="Calendar">Calendar</a>
                                    </li>
                                                                    <li>
                                                                                <a href="index.php?module=Documents&amp;action=index&amp;parentTab=All"
                                                                                   id="moduleTab_9_Documents"
                                                                                   module="Documents">Documents</a>
                                    </li>
                                                                    <li>
                                                                                <a href="index.php?module=Emails&amp;action=index&amp;parentTab=All"
                                                                                   id="moduleTab_9_Emails"
                                                                                   module="Emails">Emails</a>
                                    </li>
                                                                    <li>
                                                                                <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DSpots%26action%3Dindex%26parentTab%3DAll"
                                                                                   id="moduleTab_9_Spots"
                                                                                   module="Spots">Spots</a>
                                    </li>
                                                                                                    <li>
                                        <a href="index.php?module=Campaigns&amp;action=index&amp;parentTab=All">Campaigns</a>
                                    </li>
                                                                    <li>
                                        <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DCalls%26action%3Dindex%26parentTab%3DAll">Calls</a>
                                    </li>
                                                                    <li>
                                        <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DMeetings%26action%3Dindex%26parentTab%3DAll">Meetings</a>
                                    </li>
                                                                    <li>
                                        <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DTasks%26action%3Dindex%26parentTab%3DAll">Tasks</a>
                                    </li>
                                                                    <li>
                                        <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DNotes%26action%3Dindex%26parentTab%3DAll">Notes</a>
                                    </li>
                                                                    <li>
                                        <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DAOS_Invoices%26action%3Dindex%26parentTab%3DAll">Invoices</a>
                                    </li>
                                                                    <li>
                                        <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DAOS_Contracts%26action%3Dindex%26parentTab%3DAll">Contracts</a>
                                    </li>
                                                                    <li>
                                        <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DCases%26action%3Dindex%26parentTab%3DAll">Cases</a>
                                    </li>
                                                                    <li>
                                        <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DProspects%26action%3Dindex%26parentTab%3DAll">Targets</a>
                                    </li>
                                                                    <li>
                                        <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DProspectLists%26action%3Dindex%26parentTab%3DAll">Target Lists</a>
                                    </li>
                                                                    <li>
                                        <a href="index.php?module=Project&amp;action=index&amp;parentTab=All">Projects</a>
                                    </li>
                                                                    <li>
                                        <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DAM_ProjectTemplates%26action%3Dindex%26parentTab%3DAll">Project Templates</a>
                                    </li>
                                                                    <li>
                                        <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DFP_events%26action%3Dindex%26parentTab%3DAll">Events</a>
                                    </li>
                                                                    <li>
                                        <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DFP_Event_Locations%26action%3Dindex%26parentTab%3DAll">Locations</a>
                                    </li>
                                                                    <li>
                                        <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DAOS_Products%26action%3Dindex%26parentTab%3DAll">Products</a>
                                    </li>
                                                                    <li>
                                        <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DAOS_Product_Categories%26action%3Dindex%26parentTab%3DAll">Product Categories</a>
                                    </li>
                                                                    <li>
                                        <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DAOS_PDF_Templates%26action%3Dindex%26parentTab%3DAll">PDF Templates</a>
                                    </li>
                                                                    <li>
                                        <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3Djjwg_Maps%26action%3Dindex%26parentTab%3DAll">Maps</a>
                                    </li>
                                                                    <li>
                                        <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3Djjwg_Markers%26action%3Dindex%26parentTab%3DAll">Map Markers</a>
                                    </li>
                                                                    <li>
                                        <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3Djjwg_Areas%26action%3Dindex%26parentTab%3DAll">Map Areas</a>
                                    </li>
                                                                    <li>
                                        <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3Djjwg_Address_Cache%26action%3Dindex%26parentTab%3DAll">Map Address Cache</a>
                                    </li>
                                                                    <li>
                                        <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DAOR_Reports%26action%3Dindex%26parentTab%3DAll">Reports</a>
                                    </li>
                                                                    <li>
                                        <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DAOW_WorkFlow%26action%3Dindex%26parentTab%3DAll">WorkFlow</a>
                                    </li>
                                                                    <li>
                                        <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DAOK_KnowledgeBase%26action%3Dindex%26parentTab%3DAll">Knowledge Base</a>
                                    </li>
                                                                    <li>
                                        <a href="?action=ajaxui#ajaxUILoc=index.php%3Fmodule%3DAOK_Knowledge_Base_Categories%26action%3Dindex%26parentTab%3DAll">KB Categories</a>
                                    </li>
                                                            </ul>
                        </span></li>
                </ul>

                <script>
                  var windowResize = function () {
                    // Since the height can be changed in Sass.
                    // Take a measurement of the initial desktop navigation bar height with just one menu item
                    $('.desktop-toolbar ul.navbar-nav > li').not('.all').addClass('hidden');
                    var dth = $('.desktop-toolbar').outerHeight();

                    // Show all desktop menu items
                    $('.desktop-toolbar ul.navbar-nav > li.hidden').removeClass('hidden');

                    // Remove the each menu item from the end of the toolbar until
                    // the navigation bar is the matches the initial height.
                    while ($('.desktop-toolbar').outerHeight() > dth) {
                      ti = $('.desktop-toolbar ul.navbar-nav > li').not('.hidden').not('.all');
                      $(ti).last().addClass('hidden');
                    }
                  };
                  $(window).resize(windowResize);
                  $(document).ready(windowResize);
                </script>

            </div>

            <!-- Right side of the main navigation -->
            <div class="mobile-bar">
                <ul id="toolbar" class="toolbar">
                    <li id="quickcreatetop" class="create dropdown nav navbar-nav quickcreatetop">
                        <a class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                            CREATE
                        </a>
                        <ul class="dropdown-menu" role="menu">
                            <li>
                                <a href="index.php?module=Accounts&amp;action=EditView&amp;return_module=Accounts&amp;return_action=DetailView">Create
                                    Account</a>
                            </li>
                            <li>
                                <a href="index.php?module=Contacts&amp;action=EditView&amp;return_module=Contacts&amp;return_action=DetailView">Create
                                    Contact</a>
                            </li>
                            <li>
                                <a href="index.php?module=Opportunities&amp;action=EditView&amp;return_module=Opportunities&amp;return_action=DetailView">Create
                                    Opportunity</a>
                            </li>
                            <li>
                                <a href="index.php?module=Leads&amp;action=EditView&amp;return_module=Leads&amp;return_action=DetailView">Create
                                    Lead</a>
                            </li>
                            <li>
                                <a href="index.php?module=Documents&amp;action=EditView&amp;return_module=Documents&amp;return_action=DetailView">Create
                                    Document</a>
                            </li>
                            <li>
                                <a href="index.php?module=Calls&amp;action=EditView&amp;return_module=Calls&amp;return_action=DetailView">Log
                                    Call</a>
                            </li>
                            <li class="last">
                                <a href="index.php?module=Tasks&amp;action=EditView&amp;return_module=Tasks&amp;return_action=DetailView">Create
                                    Task</a>
                            </li>
                        </ul>
                    </li>
                    <li id="" class="dropdown nav navbar-nav navbar-search">
                        <button id="searchbutton" class="dropdown-toggle btn btn-default searchbutton"
                                data-toggle="dropdown" aria-expanded="true">
                            <!--<span class="glyphicon glyphicon-search"> </span>-->Search
                        </button>
                        <div class="dropdown-menu" role="menu" aria-labelledby="searchbutton">
                            <form id="searchformdropdown" class="searchformdropdown" name="UnifiedSearch"
                                  action="index.php" onsubmit="return SUGAR.unifiedSearchAdvanced.checkUsaAdvanced()">
                                <input type="hidden" class="form-control" name="action" value="UnifiedSearch">
                                <input type="hidden" class="form-control" name="module" value="Home">
                                <input type="hidden" class="form-control" name="search_form" value="false">
                                <input type="hidden" class="form-control" name="advanced" value="false">
                                <div class="input-group">
                                    <input type="text" class="form-control query_string" name="query_string"
                                           id="query_string" placeholder="Search..." value="">
                                    <span class="input-group-btn">
                                <button type="submit" class="btn btn-default"><!--<span class="glyphicon glyphicon-search"
                                                                                    aria-hidden="true"></span>-->Search</button>
                            </span>
                                </div>
                            </form>
                        </div>
                    </li>
                    <li id="desktop_notifications" class="dropdown nav navbar-nav desktop_notifications">
                        <button class="alertsButton btn dropdown-toggle btn-success" data-toggle="dropdown"
                                aria-expanded="false">
                            <span class="alert_count hidden">0</span>
                        </button>
                        <div id="alerts" class="dropdown-menu" role="menu" style="left: 32px;">No Current Notifications

                        </div>
                    </li>
                    <li>
                        <form id="searchform" class="navbar-form searchform" name="UnifiedSearch" action="index.php"
                              onsubmit="return SUGAR.unifiedSearchAdvanced.checkUsaAdvanced()">
                            <input type="hidden" class="form-control" name="action" value="UnifiedSearch">
                            <input type="hidden" class="form-control" name="module" value="Home">
                            <input type="hidden" class="form-control" name="search_form" value="false">
                            <input type="hidden" class="form-control" name="advanced" value="false">
                            <div class="input-group">
                                <input type="text" class="form-control query_string" name="query_string"
                                       id="query_string" placeholder="Search..." value="">
                                <span class="input-group-btn">
                        <button type="submit" class="btn btn-default"><!--<span class="glyphicon glyphicon-search"
                                                                            aria-hidden="true"></span>-->Search</button>
                    </span>
                            </div>
                        </form>
                    </li>
                    <li id="globalLinks" class="dropdown nav navbar-nav globalLinks-mobile">

                        <button id="usermenucollapsed" class="dropdown-toggle btn btn-default usermenucollapsed"
                                data-toggle="dropdown" aria-expanded="true">
                        </button>
                        <ul class="dropdown-menu user-dropdown" role="menu" aria-labelledby="dropdownMenu2">
                            <li role="presentation">
                                <a href="index.php?module=Users&amp;action=EditView&amp;record=seed_will_id">
                                    Profile
                                </a>
                            </li>
                            <li role="presentation">
                                <a id="employees_link"
                                   href="index.php?module=Employees&amp;action=index&amp;query=true">Employees</a>
                            </li>
                            <li role="presentation">
                                <a id="training_link" href="javascript:void(0)"
                                   onclick="void(window.open('http://suitecrm.com/forum/index'))">Support Forum</a>
                            </li>
                            <li role="presentation">
                                <a id="about_link" href="index.php?module=Home&amp;action=About">About</a>
                            </li>
                            <li role="presentation"><a role="menuitem" id="logout_link"
                                                       href="index.php?module=Users&amp;action=Logout"
                                                       class="utilsLink">Log Out</a></li>
                        </ul>
                    </li>
                </ul>
            </div>

        </div>
    </nav>
    <!--End Responsive Top Navigation Menu -->
    <!--Start Page Container and Responsive Sidebar -->
    <div id="sidebar_container" class="container-fluid sidebar_container">

        <a id="buttontoggle" class="buttontoggle button-toggle-expanded"><span></span></a>

        <!--<div class="row">-->
        <!--<div                  class="col-sm-3 col-md-2 sidebar">-->
        <div class="sidebar">

            <div id="actionMenuSidebar" class="actionMenuSidebar">
                <ul>
                </ul>
            </div>

            <div id="recentlyViewedSidebar" class="recentlyViewedSidebar">
                <h2 class="recent_h3">Recently Viewed</h2>
                <ul class="nav nav-pills nav-stacked">

                </ul>
            </div>

            <div id="favoritesSidebar" class="favoritesSidebar">
                <ul class="nav nav-pills nav-stacked">
                </ul>
            </div>
        </div>
        <!--</div>-->
    </div>
    <!--End Responsive Sidebar -->
    <!--Start Page content -->    </div>
<div id="content" class="content" style="padding-left: 25%;">
    <div class="container main-container bootstrap-container">
        <div></div>
        <div class="starter-template">
            <h1>Proof of Concept</h1>
            <p class="lead">Use the controls to change the properties of the nav bar.</p>
            <p>This takes variables and css written in Sass and compiles them in the browser.</p>
        </div>
        <div class="sass-theme-editor-place"></div>
        <script>
          var MySassThemeEditor = new SassThemeEditor();
          MySassThemeEditor.construct({'parent_container': '.sass-theme-editor-place'});
          MySassThemeEditor.controls.editor_variable_select_input.val("$navbar-bg").change();
        </script>
        <div class="sass-icon-editor-place">
        <img src="themes/SuiteP/images/icon-editor/check.svg">
        <img src="themes/SuiteP/images/icon-editor/radio.svg">
        <img src="themes/SuiteP/images/icon-editor/select.svg">
        </div>

    </div>
</div>

</body>
</html>
