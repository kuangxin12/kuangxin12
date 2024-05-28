define(function(require, exports, module) {

  var utils = require('utils');
  var bs = require('./cksqqxwhBS');
  var cksqqxwhSave = require('./cksqqxwhSave');
  var cksqqxwhView = require('./cksqqxwhView');

  var viewConfig = {
    initialize: function() {
      var view = utils.loadCompiledPage('cksqqxwh');
      this.$rootElement.html(view.render({}), true);
      this.pushSubView([cksqqxwhSave]);
      this.initView();

      this.eventMap = {
        "[data-action=add]": this.actionAdd,
        "[data-action=edit]": this.actionEdit,
        "[data-action=detail]": this.actionDetail,
        "[data-action=delete]": this.actionDelete,
        "[data-action=export]": this.actionExport,
        "[data-action=import]": this.actionImport,
        "[data-action=custom-column]": this.actionCustomColumn,
        "[data-action=adelete]": this.aDelete,
      };
    },

    initView: function() {
      this._initAdvanceQuery();
      this._initTable();
    },

    actionAdd: function(){
      var cksqqxwhNewTpl = utils.loadCompiledPage('cksqqxwhSave');
      $.bhPaperPileDialog.show({
        content: cksqqxwhNewTpl.render({}),
        title: "新增人员",
        ready: function($header, $body, $footer){
          cksqqxwhSave.initialize(null,null);
        }
      });
    },
        
    actionEdit: function(e){
      var id = $(e.target).attr("data-x-wid");
      var cksqqxwhEditTpl = utils.loadCompiledPage('cksqqxwhSave');
      var data = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_CKQX_QUERY', {WID:id,pageNumber:1});
          
      $.bhPaperPileDialog.show({
        content: cksqqxwhEditTpl.render({}),
        title: "编辑",
        ready: function($header, $body, $footer){
          cksqqxwhSave.initialize(id,data.rows[0]);       
          $("#emapForm").emapForm("setValue", data.rows[0]);    
        }
      });
    },
        
    actionDetail: function(e){
      var id = $(e.target).attr("data-x-wid");
      var cksqqxwhViewTpl = utils.loadCompiledPage('cksqqxwhSave');
      var data = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_CKQX_QUERY', {WID:id,pageNumber:1});
          
      $.bhPaperPileDialog.show({
        content: cksqqxwhViewTpl.render({}),
        title: "查看",
        ready: function($header, $body, $footer){
          cksqqxwhView.initialize(data.rows[0],id);
        }
      });
    },
        
    actionDelete: function(){
      var row = $("#emapdatatable").emapdatatable("checkedRecords");
      if(row.length > 0){
        var params = row.map(function(el){
        	  return {WID:el.WID};  //模型主键
        });
        BH_UTILS.bhDialogWarning({
   	        title:'提示',
   	        content:'是否删除。',
   	        buttons:[
   	            {
   	                text:'确定',
   	                callback:function(){
   	                 bs.del(params).done(function(data){
   		        	  $.bhTip({
   		  				content : '删除成功！',
   		  				state : 'success',
   		  				hideWaitTime : 2000
   		  			});
   		        	  $('#emapdatatable').emapdatatable('reloadFirstPage'); 
   		          });
                		}	
   	            
   	        },
   	       {
   	            text:'取消',
   	        }
   	    ]
   	});	       
        
      }
    },
    aDelete : function(e) {	
		var id = $(e.target).attr("data-x-wid");
		BH_UTILS.bhDialogWarning({
	        title:'提示',
	        content:'是否删除。',
	        buttons:[
	            {
	                text:'确定',
	                callback:function(){
	                	
	                	bs.del({
	            			WID : id
	            		}).done(function(data) {
	            			$.bhTip({
	            				content : '删除成功！',
	            				state : 'success',
	            				hideWaitTime : 2000
	            			});	
	            			$('#emapdatatable').emapdatatable('reloadFirstPage');	
	            		});	
	     	              
	                		},
	                		
	        },
	       {
	            text:'取消',
	        }
	    ]
	});	
		
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
        "page": "cksqqxwh",
        "action": "[添加或保存动作的别名]",//使用添加或保存动作
        //"tplUrl": "modules/htgl/dataModel.T_JZG_HT.xls",
        "preCallback": function() {
        },
        "closeCallback": function() {
           $('#emapdatatable').emapdatatable('reloadFirstPage');
        },
      });
    },
        
    actionCustomColumn: function(){
      $('#emapdatatable').emapdatatable('selectToShowColumns');
    },
        
    _initAdvanceQuery: function() {
      var searchData = WIS_EMAP_SERV.getModel(bs.api.pageModel, 'T_XXB_XXHJCSS_CKQX_QUERY', "search");
      var $query = $('#emapAdvancedQuery').emapAdvancedQuery({
        data: searchData,
        contextPath : contextPath,
        schema: true
      });
      $query.on('search', this._searchCallback);
    },

    _searchCallback: function(e, data, opts) {
      $('#emapdatatable').emapdatatable('reloadFirstPage', {
        querySetting: data
      });
    },

    _initTable: function() {
      var tableOptions = {
        pagePath: bs.api.pageModel,
        action: 'T_XXB_XXHJCSS_CKQX_QUERY',
        customColumns: [{
          colIndex: '0',
          type: 'checkbox'
        }, {
          colIndex: '1',
          type: 'tpl',
          column: {
            text: '操作',
            align: 'center',
            cellsAlign: 'center',
            cellsRenderer: function(row, column, value, rowData) {
              return  ' <a href="javascript:void(0)" data-action="adelete" data-x-wid='+ rowData.WID + '>' + '删除' + '</a>' 
               /*+ '<a href="javascript:void(0)" data-action="detail" data-x-wid=' + rowData.WID + '>' + '详情' + '</a>'*/
               /* + ' |<a href="javascript:void(0)" data-action="edit" data-x-wid=' + rowData.WID + '>' + '编辑' + '</a>'*/ ;
            }
          }
        }]
      };
      $('#emapdatatable').emapdatatable(tableOptions);
    }
  };

  return viewConfig;
});