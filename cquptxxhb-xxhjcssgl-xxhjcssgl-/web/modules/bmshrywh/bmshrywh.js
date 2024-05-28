define(function(require, exports, module) {

  var utils = require('utils');
  var bs = require('./bmshrywhBS');
  var bmshrywhSave = require('./bmshrywhSave');
  var bmshrywhView = require('./bmshrywhView');

  var viewConfig = {
    initialize: function() {
      var view = utils.loadCompiledPage('bmshrywh');
      this.$rootElement.html(view.render({}), true);
      this.pushSubView([bmshrywhSave]);
      this.initView();

      this.eventMap = {
        "[data-action=add]": this.actionAdd,
        "[data-action=edit]": this.actionEdit,
        "[data-action=detail]": this.actionDetail,
        "[data-action=delete]": this.actionDelete,
        "[data-action=export]": this.actionExport,
        "[data-action=import]": this.actionImport,
        "[data-action=custom-column]": this.actionCustomColumn
      };
    },

    initView: function() {
      this._initAdvanceQuery();
      this._initTable();
    },

    actionAdd: function(){
      var bmshrywhNewTpl = utils.loadCompiledPage('bmshrywhSave');
      $.bhPaperPileDialog.show({
        content: bmshrywhNewTpl.render({}),
        title: "新建",
        ready: function($header, $body, $footer){
          bmshrywhSave.initialize();
        }
      });
    },
        
    actionEdit: function(e){
      var id = $(e.target).attr("data-x-wid");
      var bmshrywhEditTpl = utils.loadCompiledPage('bmshrywhSave');
      var data = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_BMSHRY_QUERY', {WID:id});
          
      $.bhPaperPileDialog.show({
        content: bmshrywhEditTpl.render({}),
        title: "编辑",
        ready: function($header, $body, $footer){
          bmshrywhSave.initialize();       
          $("#emapForm").emapForm("setValue", data.rows[0]);    
        }
      });
    },
        
    actionDetail: function(e){
      var id = $(e.target).attr("data-x-wid");
      var bmshrywhViewTpl = utils.loadCompiledPage('bmshrywhSave');
      var data = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_BMSHRY_QUERY', {WID:id});
          
      $.bhPaperPileDialog.show({
        content: bmshrywhViewTpl.render({}),
        title: "查看",
        ready: function($header, $body, $footer){
          bmshrywhView.initialize(data.rows[0]);
        }
      });
    },
        
    actionDelete: function(){
      var row = $("#emapdatatable").emapdatatable("checkedRecords");
      if(row.length > 0){
        var params = row.map(function(el){
          return {WID:el.WID};  //模型主键
        });
        bs.del(params).done(function(data){
          alert("数据删除成功");
          $('#emapdatatable').emapdatatable('reload');
        });
      }
    },
        
    actionExport: function(){
      bs.exportData({}).done(function(data){
      });
    },

    actionImport: function(){
      $.emapImport({
        "contextPath": contextPath,
        "app": "xxhjcssgl",
        "module": "modules",
        "page": "bmshrywh",
        "action": "[添加或保存动作的别名]",//使用添加或保存动作
        //"tplUrl": "modules/htgl/dataModel.T_JZG_HT.xls",
        "preCallback": function() {
        },
        "closeCallback": function() {
           $('#emapdatatable').emapdatatable('reload');
        },
      });
    },
        
    actionCustomColumn: function(){
      $('#emapdatatable').emapdatatable('selectToShowColumns');
    },
    
        
    _initAdvanceQuery: function() {
      var searchData = WIS_EMAP_SERV.getModel(bs.api.pageModel, 'T_XXB_XXHJCSS_BMSHRY_QUERY', "search");
      var $query = $('#emapAdvancedQuery').emapAdvancedQuery({
        data: searchData,
        contextPath : contextPath,
        schema: true
      });
      $query.on('search', this._searchCallback);
    },

    _searchCallback: function(e, data, opts) {
      $('#emapdatatable').emapdatatable('reload', {
        querySetting: data
      });
    },

    _initTable: function() {
      var tableOptions = {
        pagePath: bs.api.pageModel,
        action: 'T_XXB_XXHJCSS_BMSHRY_QUERY',
        height:null,
        minLineNum:10,
        customColumns: [{
          colIndex: '0',
          type: 'checkbox'
        }]
      };
      $('#emapdatatable').emapdatatable(tableOptions);
    }
  };

  return viewConfig;
});