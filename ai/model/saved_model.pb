��
��
D
AddV2
x"T
y"T
z"T"
Ttype:
2	��
^
AssignVariableOp
resource
value"dtype"
dtypetype"
validate_shapebool( �
8
Const
output"dtype"
valuetensor"
dtypetype
�
Conv3D

input"T
filter"T
output"T"
Ttype:
2"
strides	list(int)(0""
paddingstring:
SAMEVALID"0
data_formatstringNDHWC:
NDHWCNCDHW"!
	dilations	list(int)	

$
DisableCopyOnRead
resource�
.
Identity

input"T
output"T"	
Ttype
�
MatMul
a"T
b"T
product"T"
transpose_abool( "
transpose_bbool( "
Ttype:
2	"
grad_abool( "
grad_bbool( 
�
	MaxPool3D

input"T
output"T"
ksize	list(int)(0"
strides	list(int)(0""
paddingstring:
SAMEVALID"0
data_formatstringNDHWC:
NDHWCNCDHW"
Ttype:
2
�
Mean

input"T
reduction_indices"Tidx
output"T"
	keep_dimsbool( ""
Ttype:
2	"
Tidxtype0:
2	
�
MergeV2Checkpoints
checkpoint_prefixes
destination_prefix"
delete_old_dirsbool("
allow_missing_filesbool( �
?
Mul
x"T
y"T
z"T"
Ttype:
2	�

NoOp
M
Pack
values"T*N
output"T"
Nint(0"	
Ttype"
axisint 
C
Placeholder
output"dtype"
dtypetype"
shapeshape:
@
ReadVariableOp
resource
value"dtype"
dtypetype�
E
Relu
features"T
activations"T"
Ttype:
2	
[
Reshape
tensor"T
shape"Tshape
output"T"	
Ttype"
Tshapetype0:
2	
o
	RestoreV2

prefix
tensor_names
shape_and_slices
tensors2dtypes"
dtypes
list(type)(0�
.
Rsqrt
x"T
y"T"
Ttype:

2
l
SaveV2

prefix
tensor_names
shape_and_slices
tensors2dtypes"
dtypes
list(type)(0�
?
Select
	condition

t"T
e"T
output"T"	
Ttype
H
ShardedFilename
basename	
shard

num_shards
filename
0
Sigmoid
x"T
y"T"
Ttype:

2
�
StatefulPartitionedCall
args2Tin
output2Tout"
Tin
list(type)("
Tout
list(type)("	
ffunc"
configstring "
config_protostring "
executor_typestring ��
@
StaticRegexFullMatch	
input

output
"
patternstring
L

StringJoin
inputs*N

output"

Nint("
	separatorstring 
<
Sub
x"T
y"T
z"T"
Ttype:
2	
�
VarHandleOp
resource"
	containerstring "
shared_namestring "

debug_namestring "
dtypetype"
shapeshape"#
allowed_deviceslist(string)
 �
9
VarIsInitializedOp
resource
is_initialized
�"serve*2.17.02v2.17.0-rc1-2-gad6d8cc177d8��
�
dense_1/biasVarHandleOp*
_output_shapes
: *

debug_namedense_1/bias/*
dtype0*
shape:*
shared_namedense_1/bias
i
 dense_1/bias/Read/ReadVariableOpReadVariableOpdense_1/bias*
_output_shapes
:*
dtype0
�
#Variable/Initializer/ReadVariableOpReadVariableOpdense_1/bias*
_class
loc:@Variable*
_output_shapes
:*
dtype0
�
VariableVarHandleOp*
_class
loc:@Variable*
_output_shapes
: *

debug_name	Variable/*
dtype0*
shape:*
shared_name
Variable
a
)Variable/IsInitialized/VarIsInitializedOpVarIsInitializedOpVariable*
_output_shapes
: 
_
Variable/AssignAssignVariableOpVariable#Variable/Initializer/ReadVariableOp*
dtype0
a
Variable/Read/ReadVariableOpReadVariableOpVariable*
_output_shapes
:*
dtype0
�
dense_1/kernelVarHandleOp*
_output_shapes
: *

debug_namedense_1/kernel/*
dtype0*
shape:	�*
shared_namedense_1/kernel
r
"dense_1/kernel/Read/ReadVariableOpReadVariableOpdense_1/kernel*
_output_shapes
:	�*
dtype0
�
%Variable_1/Initializer/ReadVariableOpReadVariableOpdense_1/kernel*
_class
loc:@Variable_1*
_output_shapes
:	�*
dtype0
�

Variable_1VarHandleOp*
_class
loc:@Variable_1*
_output_shapes
: *

debug_nameVariable_1/*
dtype0*
shape:	�*
shared_name
Variable_1
e
+Variable_1/IsInitialized/VarIsInitializedOpVarIsInitializedOp
Variable_1*
_output_shapes
: 
e
Variable_1/AssignAssignVariableOp
Variable_1%Variable_1/Initializer/ReadVariableOp*
dtype0
j
Variable_1/Read/ReadVariableOpReadVariableOp
Variable_1*
_output_shapes
:	�*
dtype0
�

dense/biasVarHandleOp*
_output_shapes
: *

debug_namedense/bias/*
dtype0*
shape:�*
shared_name
dense/bias
f
dense/bias/Read/ReadVariableOpReadVariableOp
dense/bias*
_output_shapes	
:�*
dtype0
�
%Variable_2/Initializer/ReadVariableOpReadVariableOp
dense/bias*
_class
loc:@Variable_2*
_output_shapes	
:�*
dtype0
�

Variable_2VarHandleOp*
_class
loc:@Variable_2*
_output_shapes
: *

debug_nameVariable_2/*
dtype0*
shape:�*
shared_name
Variable_2
e
+Variable_2/IsInitialized/VarIsInitializedOpVarIsInitializedOp
Variable_2*
_output_shapes
: 
e
Variable_2/AssignAssignVariableOp
Variable_2%Variable_2/Initializer/ReadVariableOp*
dtype0
f
Variable_2/Read/ReadVariableOpReadVariableOp
Variable_2*
_output_shapes	
:�*
dtype0
�
dense/kernelVarHandleOp*
_output_shapes
: *

debug_namedense/kernel/*
dtype0*
shape:
��*
shared_namedense/kernel
o
 dense/kernel/Read/ReadVariableOpReadVariableOpdense/kernel* 
_output_shapes
:
��*
dtype0
�
%Variable_3/Initializer/ReadVariableOpReadVariableOpdense/kernel*
_class
loc:@Variable_3* 
_output_shapes
:
��*
dtype0
�

Variable_3VarHandleOp*
_class
loc:@Variable_3*
_output_shapes
: *

debug_nameVariable_3/*
dtype0*
shape:
��*
shared_name
Variable_3
e
+Variable_3/IsInitialized/VarIsInitializedOpVarIsInitializedOp
Variable_3*
_output_shapes
: 
e
Variable_3/AssignAssignVariableOp
Variable_3%Variable_3/Initializer/ReadVariableOp*
dtype0
k
Variable_3/Read/ReadVariableOpReadVariableOp
Variable_3* 
_output_shapes
:
��*
dtype0
�
%batch_normalization_1/moving_varianceVarHandleOp*
_output_shapes
: *6

debug_name(&batch_normalization_1/moving_variance/*
dtype0*
shape:�*6
shared_name'%batch_normalization_1/moving_variance
�
9batch_normalization_1/moving_variance/Read/ReadVariableOpReadVariableOp%batch_normalization_1/moving_variance*
_output_shapes	
:�*
dtype0
�
%Variable_4/Initializer/ReadVariableOpReadVariableOp%batch_normalization_1/moving_variance*
_class
loc:@Variable_4*
_output_shapes	
:�*
dtype0
�

Variable_4VarHandleOp*
_class
loc:@Variable_4*
_output_shapes
: *

debug_nameVariable_4/*
dtype0*
shape:�*
shared_name
Variable_4
e
+Variable_4/IsInitialized/VarIsInitializedOpVarIsInitializedOp
Variable_4*
_output_shapes
: 
e
Variable_4/AssignAssignVariableOp
Variable_4%Variable_4/Initializer/ReadVariableOp*
dtype0
f
Variable_4/Read/ReadVariableOpReadVariableOp
Variable_4*
_output_shapes	
:�*
dtype0
�
!batch_normalization_1/moving_meanVarHandleOp*
_output_shapes
: *2

debug_name$"batch_normalization_1/moving_mean/*
dtype0*
shape:�*2
shared_name#!batch_normalization_1/moving_mean
�
5batch_normalization_1/moving_mean/Read/ReadVariableOpReadVariableOp!batch_normalization_1/moving_mean*
_output_shapes	
:�*
dtype0
�
%Variable_5/Initializer/ReadVariableOpReadVariableOp!batch_normalization_1/moving_mean*
_class
loc:@Variable_5*
_output_shapes	
:�*
dtype0
�

Variable_5VarHandleOp*
_class
loc:@Variable_5*
_output_shapes
: *

debug_nameVariable_5/*
dtype0*
shape:�*
shared_name
Variable_5
e
+Variable_5/IsInitialized/VarIsInitializedOpVarIsInitializedOp
Variable_5*
_output_shapes
: 
e
Variable_5/AssignAssignVariableOp
Variable_5%Variable_5/Initializer/ReadVariableOp*
dtype0
f
Variable_5/Read/ReadVariableOpReadVariableOp
Variable_5*
_output_shapes	
:�*
dtype0
�
batch_normalization_1/betaVarHandleOp*
_output_shapes
: *+

debug_namebatch_normalization_1/beta/*
dtype0*
shape:�*+
shared_namebatch_normalization_1/beta
�
.batch_normalization_1/beta/Read/ReadVariableOpReadVariableOpbatch_normalization_1/beta*
_output_shapes	
:�*
dtype0
�
%Variable_6/Initializer/ReadVariableOpReadVariableOpbatch_normalization_1/beta*
_class
loc:@Variable_6*
_output_shapes	
:�*
dtype0
�

Variable_6VarHandleOp*
_class
loc:@Variable_6*
_output_shapes
: *

debug_nameVariable_6/*
dtype0*
shape:�*
shared_name
Variable_6
e
+Variable_6/IsInitialized/VarIsInitializedOpVarIsInitializedOp
Variable_6*
_output_shapes
: 
e
Variable_6/AssignAssignVariableOp
Variable_6%Variable_6/Initializer/ReadVariableOp*
dtype0
f
Variable_6/Read/ReadVariableOpReadVariableOp
Variable_6*
_output_shapes	
:�*
dtype0
�
batch_normalization_1/gammaVarHandleOp*
_output_shapes
: *,

debug_namebatch_normalization_1/gamma/*
dtype0*
shape:�*,
shared_namebatch_normalization_1/gamma
�
/batch_normalization_1/gamma/Read/ReadVariableOpReadVariableOpbatch_normalization_1/gamma*
_output_shapes	
:�*
dtype0
�
%Variable_7/Initializer/ReadVariableOpReadVariableOpbatch_normalization_1/gamma*
_class
loc:@Variable_7*
_output_shapes	
:�*
dtype0
�

Variable_7VarHandleOp*
_class
loc:@Variable_7*
_output_shapes
: *

debug_nameVariable_7/*
dtype0*
shape:�*
shared_name
Variable_7
e
+Variable_7/IsInitialized/VarIsInitializedOpVarIsInitializedOp
Variable_7*
_output_shapes
: 
e
Variable_7/AssignAssignVariableOp
Variable_7%Variable_7/Initializer/ReadVariableOp*
dtype0
f
Variable_7/Read/ReadVariableOpReadVariableOp
Variable_7*
_output_shapes	
:�*
dtype0
�
conv3d_1/biasVarHandleOp*
_output_shapes
: *

debug_nameconv3d_1/bias/*
dtype0*
shape:�*
shared_nameconv3d_1/bias
l
!conv3d_1/bias/Read/ReadVariableOpReadVariableOpconv3d_1/bias*
_output_shapes	
:�*
dtype0
�
%Variable_8/Initializer/ReadVariableOpReadVariableOpconv3d_1/bias*
_class
loc:@Variable_8*
_output_shapes	
:�*
dtype0
�

Variable_8VarHandleOp*
_class
loc:@Variable_8*
_output_shapes
: *

debug_nameVariable_8/*
dtype0*
shape:�*
shared_name
Variable_8
e
+Variable_8/IsInitialized/VarIsInitializedOpVarIsInitializedOp
Variable_8*
_output_shapes
: 
e
Variable_8/AssignAssignVariableOp
Variable_8%Variable_8/Initializer/ReadVariableOp*
dtype0
f
Variable_8/Read/ReadVariableOpReadVariableOp
Variable_8*
_output_shapes	
:�*
dtype0
�
conv3d_1/kernelVarHandleOp*
_output_shapes
: * 

debug_nameconv3d_1/kernel/*
dtype0* 
shape:@�* 
shared_nameconv3d_1/kernel
�
#conv3d_1/kernel/Read/ReadVariableOpReadVariableOpconv3d_1/kernel*+
_output_shapes
:@�*
dtype0
�
%Variable_9/Initializer/ReadVariableOpReadVariableOpconv3d_1/kernel*
_class
loc:@Variable_9*+
_output_shapes
:@�*
dtype0
�

Variable_9VarHandleOp*
_class
loc:@Variable_9*
_output_shapes
: *

debug_nameVariable_9/*
dtype0* 
shape:@�*
shared_name
Variable_9
e
+Variable_9/IsInitialized/VarIsInitializedOpVarIsInitializedOp
Variable_9*
_output_shapes
: 
e
Variable_9/AssignAssignVariableOp
Variable_9%Variable_9/Initializer/ReadVariableOp*
dtype0
v
Variable_9/Read/ReadVariableOpReadVariableOp
Variable_9*+
_output_shapes
:@�*
dtype0
�
#batch_normalization/moving_varianceVarHandleOp*
_output_shapes
: *4

debug_name&$batch_normalization/moving_variance/*
dtype0*
shape:@*4
shared_name%#batch_normalization/moving_variance
�
7batch_normalization/moving_variance/Read/ReadVariableOpReadVariableOp#batch_normalization/moving_variance*
_output_shapes
:@*
dtype0
�
&Variable_10/Initializer/ReadVariableOpReadVariableOp#batch_normalization/moving_variance*
_class
loc:@Variable_10*
_output_shapes
:@*
dtype0
�
Variable_10VarHandleOp*
_class
loc:@Variable_10*
_output_shapes
: *

debug_nameVariable_10/*
dtype0*
shape:@*
shared_nameVariable_10
g
,Variable_10/IsInitialized/VarIsInitializedOpVarIsInitializedOpVariable_10*
_output_shapes
: 
h
Variable_10/AssignAssignVariableOpVariable_10&Variable_10/Initializer/ReadVariableOp*
dtype0
g
Variable_10/Read/ReadVariableOpReadVariableOpVariable_10*
_output_shapes
:@*
dtype0
�
batch_normalization/moving_meanVarHandleOp*
_output_shapes
: *0

debug_name" batch_normalization/moving_mean/*
dtype0*
shape:@*0
shared_name!batch_normalization/moving_mean
�
3batch_normalization/moving_mean/Read/ReadVariableOpReadVariableOpbatch_normalization/moving_mean*
_output_shapes
:@*
dtype0
�
&Variable_11/Initializer/ReadVariableOpReadVariableOpbatch_normalization/moving_mean*
_class
loc:@Variable_11*
_output_shapes
:@*
dtype0
�
Variable_11VarHandleOp*
_class
loc:@Variable_11*
_output_shapes
: *

debug_nameVariable_11/*
dtype0*
shape:@*
shared_nameVariable_11
g
,Variable_11/IsInitialized/VarIsInitializedOpVarIsInitializedOpVariable_11*
_output_shapes
: 
h
Variable_11/AssignAssignVariableOpVariable_11&Variable_11/Initializer/ReadVariableOp*
dtype0
g
Variable_11/Read/ReadVariableOpReadVariableOpVariable_11*
_output_shapes
:@*
dtype0
�
batch_normalization/betaVarHandleOp*
_output_shapes
: *)

debug_namebatch_normalization/beta/*
dtype0*
shape:@*)
shared_namebatch_normalization/beta
�
,batch_normalization/beta/Read/ReadVariableOpReadVariableOpbatch_normalization/beta*
_output_shapes
:@*
dtype0
�
&Variable_12/Initializer/ReadVariableOpReadVariableOpbatch_normalization/beta*
_class
loc:@Variable_12*
_output_shapes
:@*
dtype0
�
Variable_12VarHandleOp*
_class
loc:@Variable_12*
_output_shapes
: *

debug_nameVariable_12/*
dtype0*
shape:@*
shared_nameVariable_12
g
,Variable_12/IsInitialized/VarIsInitializedOpVarIsInitializedOpVariable_12*
_output_shapes
: 
h
Variable_12/AssignAssignVariableOpVariable_12&Variable_12/Initializer/ReadVariableOp*
dtype0
g
Variable_12/Read/ReadVariableOpReadVariableOpVariable_12*
_output_shapes
:@*
dtype0
�
batch_normalization/gammaVarHandleOp*
_output_shapes
: **

debug_namebatch_normalization/gamma/*
dtype0*
shape:@**
shared_namebatch_normalization/gamma
�
-batch_normalization/gamma/Read/ReadVariableOpReadVariableOpbatch_normalization/gamma*
_output_shapes
:@*
dtype0
�
&Variable_13/Initializer/ReadVariableOpReadVariableOpbatch_normalization/gamma*
_class
loc:@Variable_13*
_output_shapes
:@*
dtype0
�
Variable_13VarHandleOp*
_class
loc:@Variable_13*
_output_shapes
: *

debug_nameVariable_13/*
dtype0*
shape:@*
shared_nameVariable_13
g
,Variable_13/IsInitialized/VarIsInitializedOpVarIsInitializedOpVariable_13*
_output_shapes
: 
h
Variable_13/AssignAssignVariableOpVariable_13&Variable_13/Initializer/ReadVariableOp*
dtype0
g
Variable_13/Read/ReadVariableOpReadVariableOpVariable_13*
_output_shapes
:@*
dtype0
�
conv3d/biasVarHandleOp*
_output_shapes
: *

debug_nameconv3d/bias/*
dtype0*
shape:@*
shared_nameconv3d/bias
g
conv3d/bias/Read/ReadVariableOpReadVariableOpconv3d/bias*
_output_shapes
:@*
dtype0
�
&Variable_14/Initializer/ReadVariableOpReadVariableOpconv3d/bias*
_class
loc:@Variable_14*
_output_shapes
:@*
dtype0
�
Variable_14VarHandleOp*
_class
loc:@Variable_14*
_output_shapes
: *

debug_nameVariable_14/*
dtype0*
shape:@*
shared_nameVariable_14
g
,Variable_14/IsInitialized/VarIsInitializedOpVarIsInitializedOpVariable_14*
_output_shapes
: 
h
Variable_14/AssignAssignVariableOpVariable_14&Variable_14/Initializer/ReadVariableOp*
dtype0
g
Variable_14/Read/ReadVariableOpReadVariableOpVariable_14*
_output_shapes
:@*
dtype0
�
conv3d/kernelVarHandleOp*
_output_shapes
: *

debug_nameconv3d/kernel/*
dtype0*
shape:@*
shared_nameconv3d/kernel
{
!conv3d/kernel/Read/ReadVariableOpReadVariableOpconv3d/kernel**
_output_shapes
:@*
dtype0
�
&Variable_15/Initializer/ReadVariableOpReadVariableOpconv3d/kernel*
_class
loc:@Variable_15**
_output_shapes
:@*
dtype0
�
Variable_15VarHandleOp*
_class
loc:@Variable_15*
_output_shapes
: *

debug_nameVariable_15/*
dtype0*
shape:@*
shared_nameVariable_15
g
,Variable_15/IsInitialized/VarIsInitializedOpVarIsInitializedOpVariable_15*
_output_shapes
: 
h
Variable_15/AssignAssignVariableOpVariable_15&Variable_15/Initializer/ReadVariableOp*
dtype0
w
Variable_15/Read/ReadVariableOpReadVariableOpVariable_15**
_output_shapes
:@*
dtype0
�
SGD/iterationVarHandleOp*
_output_shapes
: *

debug_nameSGD/iteration/*
dtype0	*
shape: *
shared_nameSGD/iteration
g
!SGD/iteration/Read/ReadVariableOpReadVariableOpSGD/iteration*
_output_shapes
: *
dtype0	
�
&Variable_16/Initializer/ReadVariableOpReadVariableOpSGD/iteration*
_class
loc:@Variable_16*
_output_shapes
: *
dtype0	
�
Variable_16VarHandleOp*
_class
loc:@Variable_16*
_output_shapes
: *

debug_nameVariable_16/*
dtype0	*
shape: *
shared_nameVariable_16
g
,Variable_16/IsInitialized/VarIsInitializedOpVarIsInitializedOpVariable_16*
_output_shapes
: 
h
Variable_16/AssignAssignVariableOpVariable_16&Variable_16/Initializer/ReadVariableOp*
dtype0	
c
Variable_16/Read/ReadVariableOpReadVariableOpVariable_16*
_output_shapes
: *
dtype0	
�
serving_default_inputsPlaceholder*5
_output_shapes#
!:�����������*
dtype0**
shape!:�����������
�
StatefulPartitionedCallStatefulPartitionedCallserving_default_inputsconv3d/kernelconv3d/biasbatch_normalization/moving_mean#batch_normalization/moving_variancebatch_normalization/gammabatch_normalization/betaconv3d_1/kernelconv3d_1/bias!batch_normalization_1/moving_mean%batch_normalization_1/moving_variancebatch_normalization_1/gammabatch_normalization_1/betadense/kernel
dense/biasdense_1/kerneldense_1/bias*
Tin
2*
Tout
2*
_collective_manager_ids
 *'
_output_shapes
:���������*2
_read_only_resource_inputs
	
*0
config_proto 

CPU

GPU2*0J 8� *<
f7R5
3__inference_signature_wrapper_serving_default_55099

NoOpNoOp
�
ConstConst"/device:CPU:0*
_output_shapes
: *
dtype0*�
value�B� B�
�
_tracked
_inbound_nodes
_outbound_nodes
_losses
_losses_override
_operations
_layers
_build_shapes_dict
	output_names

	optimizer
_default_save_signature

signatures*
* 
* 
* 
* 
* 
R
0
1
2
3
4
5
6
7
8
9
10*
R
0
1
2
3
4
5
6
7
8
9
10*
* 
* 
`

_variables
_trainable_variables
 _trainable_variables_indices

iterations*

trace_0* 

serving_default* 
]
_inbound_nodes
_outbound_nodes
 _losses
!	_loss_ids
"_losses_override* 
�
#_kernel
$bias
%_inbound_nodes
&_outbound_nodes
'_losses
(	_loss_ids
)_losses_override
*_build_shapes_dict*
u
+_inbound_nodes
,_outbound_nodes
-_losses
.	_loss_ids
/_losses_override
0_build_shapes_dict* 
�
	1gamma
2beta
3moving_mean
4moving_variance
5_inbound_nodes
6_outbound_nodes
7_losses
8	_loss_ids
9_losses_override
:_reduction_axes
;_build_shapes_dict*
�
<_kernel
=bias
>_inbound_nodes
?_outbound_nodes
@_losses
A	_loss_ids
B_losses_override
C_build_shapes_dict*
u
D_inbound_nodes
E_outbound_nodes
F_losses
G	_loss_ids
H_losses_override
I_build_shapes_dict* 
�
	Jgamma
Kbeta
Lmoving_mean
Mmoving_variance
N_inbound_nodes
O_outbound_nodes
P_losses
Q	_loss_ids
R_losses_override
S_reduction_axes
T_build_shapes_dict*
u
U_inbound_nodes
V_outbound_nodes
W_losses
X	_loss_ids
Y_losses_override
Z_build_shapes_dict* 
�
[_kernel
\bias
]_inbound_nodes
^_outbound_nodes
__losses
`	_loss_ids
a_losses_override
b_build_shapes_dict*
u
c_inbound_nodes
d_outbound_nodes
e_losses
f	_loss_ids
g_losses_override
h_build_shapes_dict* 
�
i_kernel
jbias
k_inbound_nodes
l_outbound_nodes
m_losses
n	_loss_ids
o_losses_override
p_build_shapes_dict*

0*
* 
* 
TN
VARIABLE_VALUEVariable_16/optimizer/iterations/.ATTRIBUTES/VARIABLE_VALUE*
* 
* 
* 
* 
* 
* 
* 
UO
VARIABLE_VALUEVariable_150_operations/1/_kernel/.ATTRIBUTES/VARIABLE_VALUE*
RL
VARIABLE_VALUEVariable_14-_operations/1/bias/.ATTRIBUTES/VARIABLE_VALUE*
* 
* 
* 
* 
* 
* 
* 
* 
* 
* 
* 
* 
SM
VARIABLE_VALUEVariable_13._operations/3/gamma/.ATTRIBUTES/VARIABLE_VALUE*
RL
VARIABLE_VALUEVariable_12-_operations/3/beta/.ATTRIBUTES/VARIABLE_VALUE*
YS
VARIABLE_VALUEVariable_114_operations/3/moving_mean/.ATTRIBUTES/VARIABLE_VALUE*
]W
VARIABLE_VALUEVariable_108_operations/3/moving_variance/.ATTRIBUTES/VARIABLE_VALUE*
* 
* 
* 
* 
* 
* 
* 
TN
VARIABLE_VALUE
Variable_90_operations/4/_kernel/.ATTRIBUTES/VARIABLE_VALUE*
QK
VARIABLE_VALUE
Variable_8-_operations/4/bias/.ATTRIBUTES/VARIABLE_VALUE*
* 
* 
* 
* 
* 
* 
* 
* 
* 
* 
* 
* 
RL
VARIABLE_VALUE
Variable_7._operations/6/gamma/.ATTRIBUTES/VARIABLE_VALUE*
QK
VARIABLE_VALUE
Variable_6-_operations/6/beta/.ATTRIBUTES/VARIABLE_VALUE*
XR
VARIABLE_VALUE
Variable_54_operations/6/moving_mean/.ATTRIBUTES/VARIABLE_VALUE*
\V
VARIABLE_VALUE
Variable_48_operations/6/moving_variance/.ATTRIBUTES/VARIABLE_VALUE*
* 
* 
* 
* 
* 
* 
* 
* 
* 
* 
* 
* 
* 
TN
VARIABLE_VALUE
Variable_30_operations/8/_kernel/.ATTRIBUTES/VARIABLE_VALUE*
QK
VARIABLE_VALUE
Variable_2-_operations/8/bias/.ATTRIBUTES/VARIABLE_VALUE*
* 
* 
* 
* 
* 
* 
* 
* 
* 
* 
* 
* 
UO
VARIABLE_VALUE
Variable_11_operations/10/_kernel/.ATTRIBUTES/VARIABLE_VALUE*
PJ
VARIABLE_VALUEVariable._operations/10/bias/.ATTRIBUTES/VARIABLE_VALUE*
* 
* 
* 
* 
* 
* 
O
saver_filenamePlaceholder*
_output_shapes
: *
dtype0*
shape: 
�
StatefulPartitionedCall_1StatefulPartitionedCallsaver_filenameVariable_16Variable_15Variable_14Variable_13Variable_12Variable_11Variable_10
Variable_9
Variable_8
Variable_7
Variable_6
Variable_5
Variable_4
Variable_3
Variable_2
Variable_1VariableConst*
Tin
2*
Tout
2*
_collective_manager_ids
 *
_output_shapes
: * 
_read_only_resource_inputs
 *0
config_proto 

CPU

GPU2*0J 8� *'
f"R 
__inference__traced_save_55301
�
StatefulPartitionedCall_2StatefulPartitionedCallsaver_filenameVariable_16Variable_15Variable_14Variable_13Variable_12Variable_11Variable_10
Variable_9
Variable_8
Variable_7
Variable_6
Variable_5
Variable_4
Variable_3
Variable_2
Variable_1Variable*
Tin
2*
Tout
2*
_collective_manager_ids
 *
_output_shapes
: * 
_read_only_resource_inputs
 *0
config_proto 

CPU

GPU2*0J 8� **
f%R#
!__inference__traced_restore_55361��
�
�
3__inference_signature_wrapper_serving_default_55099

inputs%
unknown:@
	unknown_0:@
	unknown_1:@
	unknown_2:@
	unknown_3:@
	unknown_4:@(
	unknown_5:@�
	unknown_6:	�
	unknown_7:	�
	unknown_8:	�
	unknown_9:	�

unknown_10:	�

unknown_11:
��

unknown_12:	�

unknown_13:	�

unknown_14:
identity��StatefulPartitionedCall�
StatefulPartitionedCallStatefulPartitionedCallinputsunknown	unknown_0	unknown_1	unknown_2	unknown_3	unknown_4	unknown_5	unknown_6	unknown_7	unknown_8	unknown_9
unknown_10
unknown_11
unknown_12
unknown_13
unknown_14*
Tin
2*
Tout
2*
_collective_manager_ids
 *'
_output_shapes
:���������*2
_read_only_resource_inputs
	
*0
config_proto 

CPU

GPU2*0J 8� **
f%R#
!__inference_serving_default_55061o
IdentityIdentity StatefulPartitionedCall:output:0^NoOp*
T0*'
_output_shapes
:���������<
NoOpNoOp^StatefulPartitionedCall*
_output_shapes
 "
identityIdentity:output:0*(
_construction_contextkEagerRuntime*T
_input_shapesC
A:�����������: : : : : : : : : : : : : : : : 22
StatefulPartitionedCallStatefulPartitionedCall:] Y
5
_output_shapes#
!:�����������
 
_user_specified_nameinputs:%!

_user_specified_name55065:%!

_user_specified_name55067:%!

_user_specified_name55069:%!

_user_specified_name55071:%!

_user_specified_name55073:%!

_user_specified_name55075:%!

_user_specified_name55077:%!

_user_specified_name55079:%	!

_user_specified_name55081:%
!

_user_specified_name55083:%!

_user_specified_name55085:%!

_user_specified_name55087:%!

_user_specified_name55089:%!

_user_specified_name55091:%!

_user_specified_name55093:%!

_user_specified_name55095
��
�
__inference__traced_save_55301
file_prefix,
"read_disablecopyonread_variable_16:	 B
$read_1_disablecopyonread_variable_15:@2
$read_2_disablecopyonread_variable_14:@2
$read_3_disablecopyonread_variable_13:@2
$read_4_disablecopyonread_variable_12:@2
$read_5_disablecopyonread_variable_11:@2
$read_6_disablecopyonread_variable_10:@B
#read_7_disablecopyonread_variable_9:@�2
#read_8_disablecopyonread_variable_8:	�2
#read_9_disablecopyonread_variable_7:	�3
$read_10_disablecopyonread_variable_6:	�3
$read_11_disablecopyonread_variable_5:	�3
$read_12_disablecopyonread_variable_4:	�8
$read_13_disablecopyonread_variable_3:
��3
$read_14_disablecopyonread_variable_2:	�7
$read_15_disablecopyonread_variable_1:	�0
"read_16_disablecopyonread_variable:
savev2_const
identity_35��MergeV2Checkpoints�Read/DisableCopyOnRead�Read/ReadVariableOp�Read_1/DisableCopyOnRead�Read_1/ReadVariableOp�Read_10/DisableCopyOnRead�Read_10/ReadVariableOp�Read_11/DisableCopyOnRead�Read_11/ReadVariableOp�Read_12/DisableCopyOnRead�Read_12/ReadVariableOp�Read_13/DisableCopyOnRead�Read_13/ReadVariableOp�Read_14/DisableCopyOnRead�Read_14/ReadVariableOp�Read_15/DisableCopyOnRead�Read_15/ReadVariableOp�Read_16/DisableCopyOnRead�Read_16/ReadVariableOp�Read_2/DisableCopyOnRead�Read_2/ReadVariableOp�Read_3/DisableCopyOnRead�Read_3/ReadVariableOp�Read_4/DisableCopyOnRead�Read_4/ReadVariableOp�Read_5/DisableCopyOnRead�Read_5/ReadVariableOp�Read_6/DisableCopyOnRead�Read_6/ReadVariableOp�Read_7/DisableCopyOnRead�Read_7/ReadVariableOp�Read_8/DisableCopyOnRead�Read_8/ReadVariableOp�Read_9/DisableCopyOnRead�Read_9/ReadVariableOpw
StaticRegexFullMatchStaticRegexFullMatchfile_prefix"/device:CPU:**
_output_shapes
: *
pattern
^s3://.*Z
ConstConst"/device:CPU:**
_output_shapes
: *
dtype0*
valueB B.parta
Const_1Const"/device:CPU:**
_output_shapes
: *
dtype0*
valueB B
_temp/part�
SelectSelectStaticRegexFullMatch:output:0Const:output:0Const_1:output:0"/device:CPU:**
T0*
_output_shapes
: f

StringJoin
StringJoinfile_prefixSelect:output:0"/device:CPU:**
N*
_output_shapes
: e
Read/DisableCopyOnReadDisableCopyOnRead"read_disablecopyonread_variable_16*
_output_shapes
 �
Read/ReadVariableOpReadVariableOp"read_disablecopyonread_variable_16^Read/DisableCopyOnRead*
_output_shapes
: *
dtype0	R
IdentityIdentityRead/ReadVariableOp:value:0*
T0	*
_output_shapes
: Y

Identity_1IdentityIdentity:output:0"/device:CPU:0*
T0	*
_output_shapes
: i
Read_1/DisableCopyOnReadDisableCopyOnRead$read_1_disablecopyonread_variable_15*
_output_shapes
 �
Read_1/ReadVariableOpReadVariableOp$read_1_disablecopyonread_variable_15^Read_1/DisableCopyOnRead**
_output_shapes
:@*
dtype0j

Identity_2IdentityRead_1/ReadVariableOp:value:0*
T0**
_output_shapes
:@o

Identity_3IdentityIdentity_2:output:0"/device:CPU:0*
T0**
_output_shapes
:@i
Read_2/DisableCopyOnReadDisableCopyOnRead$read_2_disablecopyonread_variable_14*
_output_shapes
 �
Read_2/ReadVariableOpReadVariableOp$read_2_disablecopyonread_variable_14^Read_2/DisableCopyOnRead*
_output_shapes
:@*
dtype0Z

Identity_4IdentityRead_2/ReadVariableOp:value:0*
T0*
_output_shapes
:@_

Identity_5IdentityIdentity_4:output:0"/device:CPU:0*
T0*
_output_shapes
:@i
Read_3/DisableCopyOnReadDisableCopyOnRead$read_3_disablecopyonread_variable_13*
_output_shapes
 �
Read_3/ReadVariableOpReadVariableOp$read_3_disablecopyonread_variable_13^Read_3/DisableCopyOnRead*
_output_shapes
:@*
dtype0Z

Identity_6IdentityRead_3/ReadVariableOp:value:0*
T0*
_output_shapes
:@_

Identity_7IdentityIdentity_6:output:0"/device:CPU:0*
T0*
_output_shapes
:@i
Read_4/DisableCopyOnReadDisableCopyOnRead$read_4_disablecopyonread_variable_12*
_output_shapes
 �
Read_4/ReadVariableOpReadVariableOp$read_4_disablecopyonread_variable_12^Read_4/DisableCopyOnRead*
_output_shapes
:@*
dtype0Z

Identity_8IdentityRead_4/ReadVariableOp:value:0*
T0*
_output_shapes
:@_

Identity_9IdentityIdentity_8:output:0"/device:CPU:0*
T0*
_output_shapes
:@i
Read_5/DisableCopyOnReadDisableCopyOnRead$read_5_disablecopyonread_variable_11*
_output_shapes
 �
Read_5/ReadVariableOpReadVariableOp$read_5_disablecopyonread_variable_11^Read_5/DisableCopyOnRead*
_output_shapes
:@*
dtype0[
Identity_10IdentityRead_5/ReadVariableOp:value:0*
T0*
_output_shapes
:@a
Identity_11IdentityIdentity_10:output:0"/device:CPU:0*
T0*
_output_shapes
:@i
Read_6/DisableCopyOnReadDisableCopyOnRead$read_6_disablecopyonread_variable_10*
_output_shapes
 �
Read_6/ReadVariableOpReadVariableOp$read_6_disablecopyonread_variable_10^Read_6/DisableCopyOnRead*
_output_shapes
:@*
dtype0[
Identity_12IdentityRead_6/ReadVariableOp:value:0*
T0*
_output_shapes
:@a
Identity_13IdentityIdentity_12:output:0"/device:CPU:0*
T0*
_output_shapes
:@h
Read_7/DisableCopyOnReadDisableCopyOnRead#read_7_disablecopyonread_variable_9*
_output_shapes
 �
Read_7/ReadVariableOpReadVariableOp#read_7_disablecopyonread_variable_9^Read_7/DisableCopyOnRead*+
_output_shapes
:@�*
dtype0l
Identity_14IdentityRead_7/ReadVariableOp:value:0*
T0*+
_output_shapes
:@�r
Identity_15IdentityIdentity_14:output:0"/device:CPU:0*
T0*+
_output_shapes
:@�h
Read_8/DisableCopyOnReadDisableCopyOnRead#read_8_disablecopyonread_variable_8*
_output_shapes
 �
Read_8/ReadVariableOpReadVariableOp#read_8_disablecopyonread_variable_8^Read_8/DisableCopyOnRead*
_output_shapes	
:�*
dtype0\
Identity_16IdentityRead_8/ReadVariableOp:value:0*
T0*
_output_shapes	
:�b
Identity_17IdentityIdentity_16:output:0"/device:CPU:0*
T0*
_output_shapes	
:�h
Read_9/DisableCopyOnReadDisableCopyOnRead#read_9_disablecopyonread_variable_7*
_output_shapes
 �
Read_9/ReadVariableOpReadVariableOp#read_9_disablecopyonread_variable_7^Read_9/DisableCopyOnRead*
_output_shapes	
:�*
dtype0\
Identity_18IdentityRead_9/ReadVariableOp:value:0*
T0*
_output_shapes	
:�b
Identity_19IdentityIdentity_18:output:0"/device:CPU:0*
T0*
_output_shapes	
:�j
Read_10/DisableCopyOnReadDisableCopyOnRead$read_10_disablecopyonread_variable_6*
_output_shapes
 �
Read_10/ReadVariableOpReadVariableOp$read_10_disablecopyonread_variable_6^Read_10/DisableCopyOnRead*
_output_shapes	
:�*
dtype0]
Identity_20IdentityRead_10/ReadVariableOp:value:0*
T0*
_output_shapes	
:�b
Identity_21IdentityIdentity_20:output:0"/device:CPU:0*
T0*
_output_shapes	
:�j
Read_11/DisableCopyOnReadDisableCopyOnRead$read_11_disablecopyonread_variable_5*
_output_shapes
 �
Read_11/ReadVariableOpReadVariableOp$read_11_disablecopyonread_variable_5^Read_11/DisableCopyOnRead*
_output_shapes	
:�*
dtype0]
Identity_22IdentityRead_11/ReadVariableOp:value:0*
T0*
_output_shapes	
:�b
Identity_23IdentityIdentity_22:output:0"/device:CPU:0*
T0*
_output_shapes	
:�j
Read_12/DisableCopyOnReadDisableCopyOnRead$read_12_disablecopyonread_variable_4*
_output_shapes
 �
Read_12/ReadVariableOpReadVariableOp$read_12_disablecopyonread_variable_4^Read_12/DisableCopyOnRead*
_output_shapes	
:�*
dtype0]
Identity_24IdentityRead_12/ReadVariableOp:value:0*
T0*
_output_shapes	
:�b
Identity_25IdentityIdentity_24:output:0"/device:CPU:0*
T0*
_output_shapes	
:�j
Read_13/DisableCopyOnReadDisableCopyOnRead$read_13_disablecopyonread_variable_3*
_output_shapes
 �
Read_13/ReadVariableOpReadVariableOp$read_13_disablecopyonread_variable_3^Read_13/DisableCopyOnRead* 
_output_shapes
:
��*
dtype0b
Identity_26IdentityRead_13/ReadVariableOp:value:0*
T0* 
_output_shapes
:
��g
Identity_27IdentityIdentity_26:output:0"/device:CPU:0*
T0* 
_output_shapes
:
��j
Read_14/DisableCopyOnReadDisableCopyOnRead$read_14_disablecopyonread_variable_2*
_output_shapes
 �
Read_14/ReadVariableOpReadVariableOp$read_14_disablecopyonread_variable_2^Read_14/DisableCopyOnRead*
_output_shapes	
:�*
dtype0]
Identity_28IdentityRead_14/ReadVariableOp:value:0*
T0*
_output_shapes	
:�b
Identity_29IdentityIdentity_28:output:0"/device:CPU:0*
T0*
_output_shapes	
:�j
Read_15/DisableCopyOnReadDisableCopyOnRead$read_15_disablecopyonread_variable_1*
_output_shapes
 �
Read_15/ReadVariableOpReadVariableOp$read_15_disablecopyonread_variable_1^Read_15/DisableCopyOnRead*
_output_shapes
:	�*
dtype0a
Identity_30IdentityRead_15/ReadVariableOp:value:0*
T0*
_output_shapes
:	�f
Identity_31IdentityIdentity_30:output:0"/device:CPU:0*
T0*
_output_shapes
:	�h
Read_16/DisableCopyOnReadDisableCopyOnRead"read_16_disablecopyonread_variable*
_output_shapes
 �
Read_16/ReadVariableOpReadVariableOp"read_16_disablecopyonread_variable^Read_16/DisableCopyOnRead*
_output_shapes
:*
dtype0\
Identity_32IdentityRead_16/ReadVariableOp:value:0*
T0*
_output_shapes
:a
Identity_33IdentityIdentity_32:output:0"/device:CPU:0*
T0*
_output_shapes
:L

num_shardsConst*
_output_shapes
: *
dtype0*
value	B :f
ShardedFilename/shardConst"/device:CPU:0*
_output_shapes
: *
dtype0*
value	B : �
ShardedFilenameShardedFilenameStringJoin:output:0ShardedFilename/shard:output:0num_shards:output:0"/device:CPU:0*
_output_shapes
: �
SaveV2/tensor_namesConst"/device:CPU:0*
_output_shapes
:*
dtype0*�
value�B�B/optimizer/iterations/.ATTRIBUTES/VARIABLE_VALUEB0_operations/1/_kernel/.ATTRIBUTES/VARIABLE_VALUEB-_operations/1/bias/.ATTRIBUTES/VARIABLE_VALUEB._operations/3/gamma/.ATTRIBUTES/VARIABLE_VALUEB-_operations/3/beta/.ATTRIBUTES/VARIABLE_VALUEB4_operations/3/moving_mean/.ATTRIBUTES/VARIABLE_VALUEB8_operations/3/moving_variance/.ATTRIBUTES/VARIABLE_VALUEB0_operations/4/_kernel/.ATTRIBUTES/VARIABLE_VALUEB-_operations/4/bias/.ATTRIBUTES/VARIABLE_VALUEB._operations/6/gamma/.ATTRIBUTES/VARIABLE_VALUEB-_operations/6/beta/.ATTRIBUTES/VARIABLE_VALUEB4_operations/6/moving_mean/.ATTRIBUTES/VARIABLE_VALUEB8_operations/6/moving_variance/.ATTRIBUTES/VARIABLE_VALUEB0_operations/8/_kernel/.ATTRIBUTES/VARIABLE_VALUEB-_operations/8/bias/.ATTRIBUTES/VARIABLE_VALUEB1_operations/10/_kernel/.ATTRIBUTES/VARIABLE_VALUEB._operations/10/bias/.ATTRIBUTES/VARIABLE_VALUEB_CHECKPOINTABLE_OBJECT_GRAPH�
SaveV2/shape_and_slicesConst"/device:CPU:0*
_output_shapes
:*
dtype0*7
value.B,B B B B B B B B B B B B B B B B B B �
SaveV2SaveV2ShardedFilename:filename:0SaveV2/tensor_names:output:0 SaveV2/shape_and_slices:output:0Identity_1:output:0Identity_3:output:0Identity_5:output:0Identity_7:output:0Identity_9:output:0Identity_11:output:0Identity_13:output:0Identity_15:output:0Identity_17:output:0Identity_19:output:0Identity_21:output:0Identity_23:output:0Identity_25:output:0Identity_27:output:0Identity_29:output:0Identity_31:output:0Identity_33:output:0savev2_const"/device:CPU:0*&
 _has_manual_control_dependencies(*
_output_shapes
 * 
dtypes
2	�
&MergeV2Checkpoints/checkpoint_prefixesPackShardedFilename:filename:0^SaveV2"/device:CPU:0*
N*
T0*
_output_shapes
:�
MergeV2CheckpointsMergeV2Checkpoints/MergeV2Checkpoints/checkpoint_prefixes:output:0file_prefix"/device:CPU:0*&
 _has_manual_control_dependencies(*
_output_shapes
 i
Identity_34Identityfile_prefix^MergeV2Checkpoints"/device:CPU:0*
T0*
_output_shapes
: U
Identity_35IdentityIdentity_34:output:0^NoOp*
T0*
_output_shapes
: �
NoOpNoOp^MergeV2Checkpoints^Read/DisableCopyOnRead^Read/ReadVariableOp^Read_1/DisableCopyOnRead^Read_1/ReadVariableOp^Read_10/DisableCopyOnRead^Read_10/ReadVariableOp^Read_11/DisableCopyOnRead^Read_11/ReadVariableOp^Read_12/DisableCopyOnRead^Read_12/ReadVariableOp^Read_13/DisableCopyOnRead^Read_13/ReadVariableOp^Read_14/DisableCopyOnRead^Read_14/ReadVariableOp^Read_15/DisableCopyOnRead^Read_15/ReadVariableOp^Read_16/DisableCopyOnRead^Read_16/ReadVariableOp^Read_2/DisableCopyOnRead^Read_2/ReadVariableOp^Read_3/DisableCopyOnRead^Read_3/ReadVariableOp^Read_4/DisableCopyOnRead^Read_4/ReadVariableOp^Read_5/DisableCopyOnRead^Read_5/ReadVariableOp^Read_6/DisableCopyOnRead^Read_6/ReadVariableOp^Read_7/DisableCopyOnRead^Read_7/ReadVariableOp^Read_8/DisableCopyOnRead^Read_8/ReadVariableOp^Read_9/DisableCopyOnRead^Read_9/ReadVariableOp*
_output_shapes
 "#
identity_35Identity_35:output:0*(
_construction_contextkEagerRuntime*9
_input_shapes(
&: : : : : : : : : : : : : : : : : : : 2(
MergeV2CheckpointsMergeV2Checkpoints20
Read/DisableCopyOnReadRead/DisableCopyOnRead2*
Read/ReadVariableOpRead/ReadVariableOp24
Read_1/DisableCopyOnReadRead_1/DisableCopyOnRead2.
Read_1/ReadVariableOpRead_1/ReadVariableOp26
Read_10/DisableCopyOnReadRead_10/DisableCopyOnRead20
Read_10/ReadVariableOpRead_10/ReadVariableOp26
Read_11/DisableCopyOnReadRead_11/DisableCopyOnRead20
Read_11/ReadVariableOpRead_11/ReadVariableOp26
Read_12/DisableCopyOnReadRead_12/DisableCopyOnRead20
Read_12/ReadVariableOpRead_12/ReadVariableOp26
Read_13/DisableCopyOnReadRead_13/DisableCopyOnRead20
Read_13/ReadVariableOpRead_13/ReadVariableOp26
Read_14/DisableCopyOnReadRead_14/DisableCopyOnRead20
Read_14/ReadVariableOpRead_14/ReadVariableOp26
Read_15/DisableCopyOnReadRead_15/DisableCopyOnRead20
Read_15/ReadVariableOpRead_15/ReadVariableOp26
Read_16/DisableCopyOnReadRead_16/DisableCopyOnRead20
Read_16/ReadVariableOpRead_16/ReadVariableOp24
Read_2/DisableCopyOnReadRead_2/DisableCopyOnRead2.
Read_2/ReadVariableOpRead_2/ReadVariableOp24
Read_3/DisableCopyOnReadRead_3/DisableCopyOnRead2.
Read_3/ReadVariableOpRead_3/ReadVariableOp24
Read_4/DisableCopyOnReadRead_4/DisableCopyOnRead2.
Read_4/ReadVariableOpRead_4/ReadVariableOp24
Read_5/DisableCopyOnReadRead_5/DisableCopyOnRead2.
Read_5/ReadVariableOpRead_5/ReadVariableOp24
Read_6/DisableCopyOnReadRead_6/DisableCopyOnRead2.
Read_6/ReadVariableOpRead_6/ReadVariableOp24
Read_7/DisableCopyOnReadRead_7/DisableCopyOnRead2.
Read_7/ReadVariableOpRead_7/ReadVariableOp24
Read_8/DisableCopyOnReadRead_8/DisableCopyOnRead2.
Read_8/ReadVariableOpRead_8/ReadVariableOp24
Read_9/DisableCopyOnReadRead_9/DisableCopyOnRead2.
Read_9/ReadVariableOpRead_9/ReadVariableOp:C ?

_output_shapes
: 
%
_user_specified_namefile_prefix:+'
%
_user_specified_nameVariable_16:+'
%
_user_specified_nameVariable_15:+'
%
_user_specified_nameVariable_14:+'
%
_user_specified_nameVariable_13:+'
%
_user_specified_nameVariable_12:+'
%
_user_specified_nameVariable_11:+'
%
_user_specified_nameVariable_10:*&
$
_user_specified_name
Variable_9:*	&
$
_user_specified_name
Variable_8:*
&
$
_user_specified_name
Variable_7:*&
$
_user_specified_name
Variable_6:*&
$
_user_specified_name
Variable_5:*&
$
_user_specified_name
Variable_4:*&
$
_user_specified_name
Variable_3:*&
$
_user_specified_name
Variable_2:*&
$
_user_specified_name
Variable_1:($
"
_user_specified_name
Variable:=9

_output_shapes
: 

_user_specified_nameConst
�p
�
!__inference_serving_default_55061

inputsQ
3dcnn_1_conv3d_1_convolution_readvariableop_resource:@=
/dcnn_1_conv3d_1_reshape_readvariableop_resource:@G
9dcnn_1_batch_normalization_1_cast_readvariableop_resource:@I
;dcnn_1_batch_normalization_1_cast_1_readvariableop_resource:@I
;dcnn_1_batch_normalization_1_cast_2_readvariableop_resource:@I
;dcnn_1_batch_normalization_1_cast_3_readvariableop_resource:@T
5dcnn_1_conv3d_1_2_convolution_readvariableop_resource:@�@
1dcnn_1_conv3d_1_2_reshape_readvariableop_resource:	�J
;dcnn_1_batch_normalization_1_2_cast_readvariableop_resource:	�L
=dcnn_1_batch_normalization_1_2_cast_1_readvariableop_resource:	�L
=dcnn_1_batch_normalization_1_2_cast_2_readvariableop_resource:	�L
=dcnn_1_batch_normalization_1_2_cast_3_readvariableop_resource:	�?
+dcnn_1_dense_1_cast_readvariableop_resource:
��9
*dcnn_1_dense_1_add_readvariableop_resource:	�@
-dcnn_1_dense_1_2_cast_readvariableop_resource:	�:
,dcnn_1_dense_1_2_add_readvariableop_resource:
identity��13dcnn_1/batch_normalization_1/Cast/ReadVariableOp�33dcnn_1/batch_normalization_1/Cast_1/ReadVariableOp�33dcnn_1/batch_normalization_1/Cast_2/ReadVariableOp�33dcnn_1/batch_normalization_1/Cast_3/ReadVariableOp�33dcnn_1/batch_normalization_1_2/Cast/ReadVariableOp�53dcnn_1/batch_normalization_1_2/Cast_1/ReadVariableOp�53dcnn_1/batch_normalization_1_2/Cast_2/ReadVariableOp�53dcnn_1/batch_normalization_1_2/Cast_3/ReadVariableOp�'3dcnn_1/conv3d_1/Reshape/ReadVariableOp�+3dcnn_1/conv3d_1/convolution/ReadVariableOp�)3dcnn_1/conv3d_1_2/Reshape/ReadVariableOp�-3dcnn_1/conv3d_1_2/convolution/ReadVariableOp�"3dcnn_1/dense_1/Add/ReadVariableOp�#3dcnn_1/dense_1/Cast/ReadVariableOp�$3dcnn_1/dense_1_2/Add/ReadVariableOp�%3dcnn_1/dense_1_2/Cast/ReadVariableOp�
+3dcnn_1/conv3d_1/convolution/ReadVariableOpReadVariableOp3dcnn_1_conv3d_1_convolution_readvariableop_resource**
_output_shapes
:@*
dtype0�
3dcnn_1/conv3d_1/convolutionConv3Dinputs33dcnn_1/conv3d_1/convolution/ReadVariableOp:value:0*
T0*5
_output_shapes#
!:�����������@*
paddingVALID*
strides	
�
'3dcnn_1/conv3d_1/Reshape/ReadVariableOpReadVariableOp/dcnn_1_conv3d_1_reshape_readvariableop_resource*
_output_shapes
:@*
dtype0{
3dcnn_1/conv3d_1/Reshape/shapeConst*
_output_shapes
:*
dtype0*)
value B"            @   �
3dcnn_1/conv3d_1/ReshapeReshape/3dcnn_1/conv3d_1/Reshape/ReadVariableOp:value:0'3dcnn_1/conv3d_1/Reshape/shape:output:0*
T0**
_output_shapes
:@�
3dcnn_1/conv3d_1/addAddV2%3dcnn_1/conv3d_1/convolution:output:0!3dcnn_1/conv3d_1/Reshape:output:0*
T0*5
_output_shapes#
!:�����������@w
3dcnn_1/conv3d_1/ReluRelu3dcnn_1/conv3d_1/add:z:0*
T0*5
_output_shapes#
!:�����������@�
!3dcnn_1/max_pooling3d_1/MaxPool3D	MaxPool3D#3dcnn_1/conv3d_1/Relu:activations:0*
T0*3
_output_shapes!
:���������oo@*
ksize	
*
paddingVALID*
strides	
�
13dcnn_1/batch_normalization_1/Cast/ReadVariableOpReadVariableOp9dcnn_1_batch_normalization_1_cast_readvariableop_resource*
_output_shapes
:@*
dtype0�
33dcnn_1/batch_normalization_1/Cast_1/ReadVariableOpReadVariableOp;dcnn_1_batch_normalization_1_cast_1_readvariableop_resource*
_output_shapes
:@*
dtype0�
33dcnn_1/batch_normalization_1/Cast_2/ReadVariableOpReadVariableOp;dcnn_1_batch_normalization_1_cast_2_readvariableop_resource*
_output_shapes
:@*
dtype0�
33dcnn_1/batch_normalization_1/Cast_3/ReadVariableOpReadVariableOp;dcnn_1_batch_normalization_1_cast_3_readvariableop_resource*
_output_shapes
:@*
dtype0r
-3dcnn_1/batch_normalization_1/batchnorm/add/yConst*
_output_shapes
: *
dtype0*
valueB
 *o�:�
+3dcnn_1/batch_normalization_1/batchnorm/addAddV2;3dcnn_1/batch_normalization_1/Cast_1/ReadVariableOp:value:063dcnn_1/batch_normalization_1/batchnorm/add/y:output:0*
T0*
_output_shapes
:@�
-3dcnn_1/batch_normalization_1/batchnorm/RsqrtRsqrt/3dcnn_1/batch_normalization_1/batchnorm/add:z:0*
T0*
_output_shapes
:@�
+3dcnn_1/batch_normalization_1/batchnorm/mulMul13dcnn_1/batch_normalization_1/batchnorm/Rsqrt:y:0;3dcnn_1/batch_normalization_1/Cast_2/ReadVariableOp:value:0*
T0*
_output_shapes
:@�
-3dcnn_1/batch_normalization_1/batchnorm/mul_1Mul*3dcnn_1/max_pooling3d_1/MaxPool3D:output:0/3dcnn_1/batch_normalization_1/batchnorm/mul:z:0*
T0*3
_output_shapes!
:���������oo@�
-3dcnn_1/batch_normalization_1/batchnorm/mul_2Mul93dcnn_1/batch_normalization_1/Cast/ReadVariableOp:value:0/3dcnn_1/batch_normalization_1/batchnorm/mul:z:0*
T0*
_output_shapes
:@�
+3dcnn_1/batch_normalization_1/batchnorm/subSub;3dcnn_1/batch_normalization_1/Cast_3/ReadVariableOp:value:013dcnn_1/batch_normalization_1/batchnorm/mul_2:z:0*
T0*
_output_shapes
:@�
-3dcnn_1/batch_normalization_1/batchnorm/add_1AddV213dcnn_1/batch_normalization_1/batchnorm/mul_1:z:0/3dcnn_1/batch_normalization_1/batchnorm/sub:z:0*
T0*3
_output_shapes!
:���������oo@�
-3dcnn_1/conv3d_1_2/convolution/ReadVariableOpReadVariableOp5dcnn_1_conv3d_1_2_convolution_readvariableop_resource*+
_output_shapes
:@�*
dtype0�
3dcnn_1/conv3d_1_2/convolutionConv3D13dcnn_1/batch_normalization_1/batchnorm/add_1:z:053dcnn_1/conv3d_1_2/convolution/ReadVariableOp:value:0*
T0*4
_output_shapes"
 :���������mm�*
paddingVALID*
strides	
�
)3dcnn_1/conv3d_1_2/Reshape/ReadVariableOpReadVariableOp1dcnn_1_conv3d_1_2_reshape_readvariableop_resource*
_output_shapes	
:�*
dtype0}
 3dcnn_1/conv3d_1_2/Reshape/shapeConst*
_output_shapes
:*
dtype0*)
value B"            �   �
3dcnn_1/conv3d_1_2/ReshapeReshape13dcnn_1/conv3d_1_2/Reshape/ReadVariableOp:value:0)3dcnn_1/conv3d_1_2/Reshape/shape:output:0*
T0*+
_output_shapes
:��
3dcnn_1/conv3d_1_2/addAddV2'3dcnn_1/conv3d_1_2/convolution:output:0#3dcnn_1/conv3d_1_2/Reshape:output:0*
T0*4
_output_shapes"
 :���������mm�z
3dcnn_1/conv3d_1_2/ReluRelu3dcnn_1/conv3d_1_2/add:z:0*
T0*4
_output_shapes"
 :���������mm��
#3dcnn_1/max_pooling3d_1_2/MaxPool3D	MaxPool3D%3dcnn_1/conv3d_1_2/Relu:activations:0*
T0*4
_output_shapes"
 :���������66�*
ksize	
*
paddingVALID*
strides	
�
33dcnn_1/batch_normalization_1_2/Cast/ReadVariableOpReadVariableOp;dcnn_1_batch_normalization_1_2_cast_readvariableop_resource*
_output_shapes	
:�*
dtype0�
53dcnn_1/batch_normalization_1_2/Cast_1/ReadVariableOpReadVariableOp=dcnn_1_batch_normalization_1_2_cast_1_readvariableop_resource*
_output_shapes	
:�*
dtype0�
53dcnn_1/batch_normalization_1_2/Cast_2/ReadVariableOpReadVariableOp=dcnn_1_batch_normalization_1_2_cast_2_readvariableop_resource*
_output_shapes	
:�*
dtype0�
53dcnn_1/batch_normalization_1_2/Cast_3/ReadVariableOpReadVariableOp=dcnn_1_batch_normalization_1_2_cast_3_readvariableop_resource*
_output_shapes	
:�*
dtype0t
/3dcnn_1/batch_normalization_1_2/batchnorm/add/yConst*
_output_shapes
: *
dtype0*
valueB
 *o�:�
-3dcnn_1/batch_normalization_1_2/batchnorm/addAddV2=3dcnn_1/batch_normalization_1_2/Cast_1/ReadVariableOp:value:083dcnn_1/batch_normalization_1_2/batchnorm/add/y:output:0*
T0*
_output_shapes	
:��
/3dcnn_1/batch_normalization_1_2/batchnorm/RsqrtRsqrt13dcnn_1/batch_normalization_1_2/batchnorm/add:z:0*
T0*
_output_shapes	
:��
-3dcnn_1/batch_normalization_1_2/batchnorm/mulMul33dcnn_1/batch_normalization_1_2/batchnorm/Rsqrt:y:0=3dcnn_1/batch_normalization_1_2/Cast_2/ReadVariableOp:value:0*
T0*
_output_shapes	
:��
/3dcnn_1/batch_normalization_1_2/batchnorm/mul_1Mul,3dcnn_1/max_pooling3d_1_2/MaxPool3D:output:013dcnn_1/batch_normalization_1_2/batchnorm/mul:z:0*
T0*4
_output_shapes"
 :���������66��
/3dcnn_1/batch_normalization_1_2/batchnorm/mul_2Mul;3dcnn_1/batch_normalization_1_2/Cast/ReadVariableOp:value:013dcnn_1/batch_normalization_1_2/batchnorm/mul:z:0*
T0*
_output_shapes	
:��
-3dcnn_1/batch_normalization_1_2/batchnorm/subSub=3dcnn_1/batch_normalization_1_2/Cast_3/ReadVariableOp:value:033dcnn_1/batch_normalization_1_2/batchnorm/mul_2:z:0*
T0*
_output_shapes	
:��
/3dcnn_1/batch_normalization_1_2/batchnorm/add_1AddV233dcnn_1/batch_normalization_1_2/batchnorm/mul_1:z:013dcnn_1/batch_normalization_1_2/batchnorm/sub:z:0*
T0*4
_output_shapes"
 :���������66��
93dcnn_1/global_average_pooling3d_1/Mean/reduction_indicesConst*
_output_shapes
:*
dtype0*!
valueB"         �
'3dcnn_1/global_average_pooling3d_1/MeanMean33dcnn_1/batch_normalization_1_2/batchnorm/add_1:z:0B3dcnn_1/global_average_pooling3d_1/Mean/reduction_indices:output:0*
T0*(
_output_shapes
:�����������
#3dcnn_1/dense_1/Cast/ReadVariableOpReadVariableOp+dcnn_1_dense_1_cast_readvariableop_resource* 
_output_shapes
:
��*
dtype0�
3dcnn_1/dense_1/MatMulMatMul03dcnn_1/global_average_pooling3d_1/Mean:output:0+3dcnn_1/dense_1/Cast/ReadVariableOp:value:0*
T0*(
_output_shapes
:�����������
"3dcnn_1/dense_1/Add/ReadVariableOpReadVariableOp*dcnn_1_dense_1_add_readvariableop_resource*
_output_shapes	
:�*
dtype0�
3dcnn_1/dense_1/AddAddV2 3dcnn_1/dense_1/MatMul:product:0*3dcnn_1/dense_1/Add/ReadVariableOp:value:0*
T0*(
_output_shapes
:����������h
3dcnn_1/dense_1/ReluRelu3dcnn_1/dense_1/Add:z:0*
T0*(
_output_shapes
:�����������
%3dcnn_1/dense_1_2/Cast/ReadVariableOpReadVariableOp-dcnn_1_dense_1_2_cast_readvariableop_resource*
_output_shapes
:	�*
dtype0�
3dcnn_1/dense_1_2/MatMulMatMul"3dcnn_1/dense_1/Relu:activations:0-3dcnn_1/dense_1_2/Cast/ReadVariableOp:value:0*
T0*'
_output_shapes
:����������
$3dcnn_1/dense_1_2/Add/ReadVariableOpReadVariableOp,dcnn_1_dense_1_2_add_readvariableop_resource*
_output_shapes
:*
dtype0�
3dcnn_1/dense_1_2/AddAddV2"3dcnn_1/dense_1_2/MatMul:product:0,3dcnn_1/dense_1_2/Add/ReadVariableOp:value:0*
T0*'
_output_shapes
:���������q
3dcnn_1/dense_1_2/SigmoidSigmoid3dcnn_1/dense_1_2/Add:z:0*
T0*'
_output_shapes
:���������l
IdentityIdentity3dcnn_1/dense_1_2/Sigmoid:y:0^NoOp*
T0*'
_output_shapes
:����������
NoOpNoOp2^3dcnn_1/batch_normalization_1/Cast/ReadVariableOp4^3dcnn_1/batch_normalization_1/Cast_1/ReadVariableOp4^3dcnn_1/batch_normalization_1/Cast_2/ReadVariableOp4^3dcnn_1/batch_normalization_1/Cast_3/ReadVariableOp4^3dcnn_1/batch_normalization_1_2/Cast/ReadVariableOp6^3dcnn_1/batch_normalization_1_2/Cast_1/ReadVariableOp6^3dcnn_1/batch_normalization_1_2/Cast_2/ReadVariableOp6^3dcnn_1/batch_normalization_1_2/Cast_3/ReadVariableOp(^3dcnn_1/conv3d_1/Reshape/ReadVariableOp,^3dcnn_1/conv3d_1/convolution/ReadVariableOp*^3dcnn_1/conv3d_1_2/Reshape/ReadVariableOp.^3dcnn_1/conv3d_1_2/convolution/ReadVariableOp#^3dcnn_1/dense_1/Add/ReadVariableOp$^3dcnn_1/dense_1/Cast/ReadVariableOp%^3dcnn_1/dense_1_2/Add/ReadVariableOp&^3dcnn_1/dense_1_2/Cast/ReadVariableOp*
_output_shapes
 "
identityIdentity:output:0*(
_construction_contextkEagerRuntime*T
_input_shapesC
A:�����������: : : : : : : : : : : : : : : : 2f
13dcnn_1/batch_normalization_1/Cast/ReadVariableOp13dcnn_1/batch_normalization_1/Cast/ReadVariableOp2j
33dcnn_1/batch_normalization_1/Cast_1/ReadVariableOp33dcnn_1/batch_normalization_1/Cast_1/ReadVariableOp2j
33dcnn_1/batch_normalization_1/Cast_2/ReadVariableOp33dcnn_1/batch_normalization_1/Cast_2/ReadVariableOp2j
33dcnn_1/batch_normalization_1/Cast_3/ReadVariableOp33dcnn_1/batch_normalization_1/Cast_3/ReadVariableOp2j
33dcnn_1/batch_normalization_1_2/Cast/ReadVariableOp33dcnn_1/batch_normalization_1_2/Cast/ReadVariableOp2n
53dcnn_1/batch_normalization_1_2/Cast_1/ReadVariableOp53dcnn_1/batch_normalization_1_2/Cast_1/ReadVariableOp2n
53dcnn_1/batch_normalization_1_2/Cast_2/ReadVariableOp53dcnn_1/batch_normalization_1_2/Cast_2/ReadVariableOp2n
53dcnn_1/batch_normalization_1_2/Cast_3/ReadVariableOp53dcnn_1/batch_normalization_1_2/Cast_3/ReadVariableOp2R
'3dcnn_1/conv3d_1/Reshape/ReadVariableOp'3dcnn_1/conv3d_1/Reshape/ReadVariableOp2Z
+3dcnn_1/conv3d_1/convolution/ReadVariableOp+3dcnn_1/conv3d_1/convolution/ReadVariableOp2V
)3dcnn_1/conv3d_1_2/Reshape/ReadVariableOp)3dcnn_1/conv3d_1_2/Reshape/ReadVariableOp2^
-3dcnn_1/conv3d_1_2/convolution/ReadVariableOp-3dcnn_1/conv3d_1_2/convolution/ReadVariableOp2H
"3dcnn_1/dense_1/Add/ReadVariableOp"3dcnn_1/dense_1/Add/ReadVariableOp2J
#3dcnn_1/dense_1/Cast/ReadVariableOp#3dcnn_1/dense_1/Cast/ReadVariableOp2L
$3dcnn_1/dense_1_2/Add/ReadVariableOp$3dcnn_1/dense_1_2/Add/ReadVariableOp2N
%3dcnn_1/dense_1_2/Cast/ReadVariableOp%3dcnn_1/dense_1_2/Cast/ReadVariableOp:] Y
5
_output_shapes#
!:�����������
 
_user_specified_nameinputs:($
"
_user_specified_name
resource:($
"
_user_specified_name
resource:($
"
_user_specified_name
resource:($
"
_user_specified_name
resource:($
"
_user_specified_name
resource:($
"
_user_specified_name
resource:($
"
_user_specified_name
resource:($
"
_user_specified_name
resource:(	$
"
_user_specified_name
resource:(
$
"
_user_specified_name
resource:($
"
_user_specified_name
resource:($
"
_user_specified_name
resource:($
"
_user_specified_name
resource:($
"
_user_specified_name
resource:($
"
_user_specified_name
resource:($
"
_user_specified_name
resource
�O
�	
!__inference__traced_restore_55361
file_prefix&
assignvariableop_variable_16:	 <
assignvariableop_1_variable_15:@,
assignvariableop_2_variable_14:@,
assignvariableop_3_variable_13:@,
assignvariableop_4_variable_12:@,
assignvariableop_5_variable_11:@,
assignvariableop_6_variable_10:@<
assignvariableop_7_variable_9:@�,
assignvariableop_8_variable_8:	�,
assignvariableop_9_variable_7:	�-
assignvariableop_10_variable_6:	�-
assignvariableop_11_variable_5:	�-
assignvariableop_12_variable_4:	�2
assignvariableop_13_variable_3:
��-
assignvariableop_14_variable_2:	�1
assignvariableop_15_variable_1:	�*
assignvariableop_16_variable:
identity_18��AssignVariableOp�AssignVariableOp_1�AssignVariableOp_10�AssignVariableOp_11�AssignVariableOp_12�AssignVariableOp_13�AssignVariableOp_14�AssignVariableOp_15�AssignVariableOp_16�AssignVariableOp_2�AssignVariableOp_3�AssignVariableOp_4�AssignVariableOp_5�AssignVariableOp_6�AssignVariableOp_7�AssignVariableOp_8�AssignVariableOp_9�
RestoreV2/tensor_namesConst"/device:CPU:0*
_output_shapes
:*
dtype0*�
value�B�B/optimizer/iterations/.ATTRIBUTES/VARIABLE_VALUEB0_operations/1/_kernel/.ATTRIBUTES/VARIABLE_VALUEB-_operations/1/bias/.ATTRIBUTES/VARIABLE_VALUEB._operations/3/gamma/.ATTRIBUTES/VARIABLE_VALUEB-_operations/3/beta/.ATTRIBUTES/VARIABLE_VALUEB4_operations/3/moving_mean/.ATTRIBUTES/VARIABLE_VALUEB8_operations/3/moving_variance/.ATTRIBUTES/VARIABLE_VALUEB0_operations/4/_kernel/.ATTRIBUTES/VARIABLE_VALUEB-_operations/4/bias/.ATTRIBUTES/VARIABLE_VALUEB._operations/6/gamma/.ATTRIBUTES/VARIABLE_VALUEB-_operations/6/beta/.ATTRIBUTES/VARIABLE_VALUEB4_operations/6/moving_mean/.ATTRIBUTES/VARIABLE_VALUEB8_operations/6/moving_variance/.ATTRIBUTES/VARIABLE_VALUEB0_operations/8/_kernel/.ATTRIBUTES/VARIABLE_VALUEB-_operations/8/bias/.ATTRIBUTES/VARIABLE_VALUEB1_operations/10/_kernel/.ATTRIBUTES/VARIABLE_VALUEB._operations/10/bias/.ATTRIBUTES/VARIABLE_VALUEB_CHECKPOINTABLE_OBJECT_GRAPH�
RestoreV2/shape_and_slicesConst"/device:CPU:0*
_output_shapes
:*
dtype0*7
value.B,B B B B B B B B B B B B B B B B B B �
	RestoreV2	RestoreV2file_prefixRestoreV2/tensor_names:output:0#RestoreV2/shape_and_slices:output:0"/device:CPU:0*\
_output_shapesJ
H::::::::::::::::::* 
dtypes
2	[
IdentityIdentityRestoreV2:tensors:0"/device:CPU:0*
T0	*
_output_shapes
:�
AssignVariableOpAssignVariableOpassignvariableop_variable_16Identity:output:0"/device:CPU:0*&
 _has_manual_control_dependencies(*
_output_shapes
 *
dtype0	]

Identity_1IdentityRestoreV2:tensors:1"/device:CPU:0*
T0*
_output_shapes
:�
AssignVariableOp_1AssignVariableOpassignvariableop_1_variable_15Identity_1:output:0"/device:CPU:0*&
 _has_manual_control_dependencies(*
_output_shapes
 *
dtype0]

Identity_2IdentityRestoreV2:tensors:2"/device:CPU:0*
T0*
_output_shapes
:�
AssignVariableOp_2AssignVariableOpassignvariableop_2_variable_14Identity_2:output:0"/device:CPU:0*&
 _has_manual_control_dependencies(*
_output_shapes
 *
dtype0]

Identity_3IdentityRestoreV2:tensors:3"/device:CPU:0*
T0*
_output_shapes
:�
AssignVariableOp_3AssignVariableOpassignvariableop_3_variable_13Identity_3:output:0"/device:CPU:0*&
 _has_manual_control_dependencies(*
_output_shapes
 *
dtype0]

Identity_4IdentityRestoreV2:tensors:4"/device:CPU:0*
T0*
_output_shapes
:�
AssignVariableOp_4AssignVariableOpassignvariableop_4_variable_12Identity_4:output:0"/device:CPU:0*&
 _has_manual_control_dependencies(*
_output_shapes
 *
dtype0]

Identity_5IdentityRestoreV2:tensors:5"/device:CPU:0*
T0*
_output_shapes
:�
AssignVariableOp_5AssignVariableOpassignvariableop_5_variable_11Identity_5:output:0"/device:CPU:0*&
 _has_manual_control_dependencies(*
_output_shapes
 *
dtype0]

Identity_6IdentityRestoreV2:tensors:6"/device:CPU:0*
T0*
_output_shapes
:�
AssignVariableOp_6AssignVariableOpassignvariableop_6_variable_10Identity_6:output:0"/device:CPU:0*&
 _has_manual_control_dependencies(*
_output_shapes
 *
dtype0]

Identity_7IdentityRestoreV2:tensors:7"/device:CPU:0*
T0*
_output_shapes
:�
AssignVariableOp_7AssignVariableOpassignvariableop_7_variable_9Identity_7:output:0"/device:CPU:0*&
 _has_manual_control_dependencies(*
_output_shapes
 *
dtype0]

Identity_8IdentityRestoreV2:tensors:8"/device:CPU:0*
T0*
_output_shapes
:�
AssignVariableOp_8AssignVariableOpassignvariableop_8_variable_8Identity_8:output:0"/device:CPU:0*&
 _has_manual_control_dependencies(*
_output_shapes
 *
dtype0]

Identity_9IdentityRestoreV2:tensors:9"/device:CPU:0*
T0*
_output_shapes
:�
AssignVariableOp_9AssignVariableOpassignvariableop_9_variable_7Identity_9:output:0"/device:CPU:0*&
 _has_manual_control_dependencies(*
_output_shapes
 *
dtype0_
Identity_10IdentityRestoreV2:tensors:10"/device:CPU:0*
T0*
_output_shapes
:�
AssignVariableOp_10AssignVariableOpassignvariableop_10_variable_6Identity_10:output:0"/device:CPU:0*&
 _has_manual_control_dependencies(*
_output_shapes
 *
dtype0_
Identity_11IdentityRestoreV2:tensors:11"/device:CPU:0*
T0*
_output_shapes
:�
AssignVariableOp_11AssignVariableOpassignvariableop_11_variable_5Identity_11:output:0"/device:CPU:0*&
 _has_manual_control_dependencies(*
_output_shapes
 *
dtype0_
Identity_12IdentityRestoreV2:tensors:12"/device:CPU:0*
T0*
_output_shapes
:�
AssignVariableOp_12AssignVariableOpassignvariableop_12_variable_4Identity_12:output:0"/device:CPU:0*&
 _has_manual_control_dependencies(*
_output_shapes
 *
dtype0_
Identity_13IdentityRestoreV2:tensors:13"/device:CPU:0*
T0*
_output_shapes
:�
AssignVariableOp_13AssignVariableOpassignvariableop_13_variable_3Identity_13:output:0"/device:CPU:0*&
 _has_manual_control_dependencies(*
_output_shapes
 *
dtype0_
Identity_14IdentityRestoreV2:tensors:14"/device:CPU:0*
T0*
_output_shapes
:�
AssignVariableOp_14AssignVariableOpassignvariableop_14_variable_2Identity_14:output:0"/device:CPU:0*&
 _has_manual_control_dependencies(*
_output_shapes
 *
dtype0_
Identity_15IdentityRestoreV2:tensors:15"/device:CPU:0*
T0*
_output_shapes
:�
AssignVariableOp_15AssignVariableOpassignvariableop_15_variable_1Identity_15:output:0"/device:CPU:0*&
 _has_manual_control_dependencies(*
_output_shapes
 *
dtype0_
Identity_16IdentityRestoreV2:tensors:16"/device:CPU:0*
T0*
_output_shapes
:�
AssignVariableOp_16AssignVariableOpassignvariableop_16_variableIdentity_16:output:0"/device:CPU:0*&
 _has_manual_control_dependencies(*
_output_shapes
 *
dtype0Y
NoOpNoOp"/device:CPU:0*&
 _has_manual_control_dependencies(*
_output_shapes
 �
Identity_17Identityfile_prefix^AssignVariableOp^AssignVariableOp_1^AssignVariableOp_10^AssignVariableOp_11^AssignVariableOp_12^AssignVariableOp_13^AssignVariableOp_14^AssignVariableOp_15^AssignVariableOp_16^AssignVariableOp_2^AssignVariableOp_3^AssignVariableOp_4^AssignVariableOp_5^AssignVariableOp_6^AssignVariableOp_7^AssignVariableOp_8^AssignVariableOp_9^NoOp"/device:CPU:0*
T0*
_output_shapes
: W
Identity_18IdentityIdentity_17:output:0^NoOp_1*
T0*
_output_shapes
: �
NoOp_1NoOp^AssignVariableOp^AssignVariableOp_1^AssignVariableOp_10^AssignVariableOp_11^AssignVariableOp_12^AssignVariableOp_13^AssignVariableOp_14^AssignVariableOp_15^AssignVariableOp_16^AssignVariableOp_2^AssignVariableOp_3^AssignVariableOp_4^AssignVariableOp_5^AssignVariableOp_6^AssignVariableOp_7^AssignVariableOp_8^AssignVariableOp_9*
_output_shapes
 "#
identity_18Identity_18:output:0*(
_construction_contextkEagerRuntime*7
_input_shapes&
$: : : : : : : : : : : : : : : : : : 2$
AssignVariableOpAssignVariableOp2(
AssignVariableOp_1AssignVariableOp_12*
AssignVariableOp_10AssignVariableOp_102*
AssignVariableOp_11AssignVariableOp_112*
AssignVariableOp_12AssignVariableOp_122*
AssignVariableOp_13AssignVariableOp_132*
AssignVariableOp_14AssignVariableOp_142*
AssignVariableOp_15AssignVariableOp_152*
AssignVariableOp_16AssignVariableOp_162(
AssignVariableOp_2AssignVariableOp_22(
AssignVariableOp_3AssignVariableOp_32(
AssignVariableOp_4AssignVariableOp_42(
AssignVariableOp_5AssignVariableOp_52(
AssignVariableOp_6AssignVariableOp_62(
AssignVariableOp_7AssignVariableOp_72(
AssignVariableOp_8AssignVariableOp_82(
AssignVariableOp_9AssignVariableOp_9:C ?

_output_shapes
: 
%
_user_specified_namefile_prefix:+'
%
_user_specified_nameVariable_16:+'
%
_user_specified_nameVariable_15:+'
%
_user_specified_nameVariable_14:+'
%
_user_specified_nameVariable_13:+'
%
_user_specified_nameVariable_12:+'
%
_user_specified_nameVariable_11:+'
%
_user_specified_nameVariable_10:*&
$
_user_specified_name
Variable_9:*	&
$
_user_specified_name
Variable_8:*
&
$
_user_specified_name
Variable_7:*&
$
_user_specified_name
Variable_6:*&
$
_user_specified_name
Variable_5:*&
$
_user_specified_name
Variable_4:*&
$
_user_specified_name
Variable_3:*&
$
_user_specified_name
Variable_2:*&
$
_user_specified_name
Variable_1:($
"
_user_specified_name
Variable"�L
saver_filename:0StatefulPartitionedCall_1:0StatefulPartitionedCall_28"
saved_model_main_op

NoOp*>
__saved_model_init_op%#
__saved_model_init_op

NoOp*�
serving_default�
G
inputs=
serving_default_inputs:0�����������<
output_00
StatefulPartitionedCall:0���������tensorflow/serving/predict:�5
�
_tracked
_inbound_nodes
_outbound_nodes
_losses
_losses_override
_operations
_layers
_build_shapes_dict
	output_names

	optimizer
_default_save_signature

signatures"
_generic_user_object
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
n
0
1
2
3
4
5
6
7
8
9
10"
trackable_list_wrapper
n
0
1
2
3
4
5
6
7
8
9
10"
trackable_list_wrapper
 "
trackable_dict_wrapper
 "
trackable_list_wrapper
z

_variables
_trainable_variables
 _trainable_variables_indices

iterations"
_generic_user_object
�
trace_02�
!__inference_serving_default_55061�
���
FullArgSpec
args�

jinputs
varargs
 
varkw
 
defaults
 

kwonlyargs� 
kwonlydefaults
 
annotations� *+�(
&�#�����������ztrace_0
,
serving_default"
signature_map
y
_inbound_nodes
_outbound_nodes
 _losses
!	_loss_ids
"_losses_override"
_generic_user_object
�
#_kernel
$bias
%_inbound_nodes
&_outbound_nodes
'_losses
(	_loss_ids
)_losses_override
*_build_shapes_dict"
_generic_user_object
�
+_inbound_nodes
,_outbound_nodes
-_losses
.	_loss_ids
/_losses_override
0_build_shapes_dict"
_generic_user_object
�
	1gamma
2beta
3moving_mean
4moving_variance
5_inbound_nodes
6_outbound_nodes
7_losses
8	_loss_ids
9_losses_override
:_reduction_axes
;_build_shapes_dict"
_generic_user_object
�
<_kernel
=bias
>_inbound_nodes
?_outbound_nodes
@_losses
A	_loss_ids
B_losses_override
C_build_shapes_dict"
_generic_user_object
�
D_inbound_nodes
E_outbound_nodes
F_losses
G	_loss_ids
H_losses_override
I_build_shapes_dict"
_generic_user_object
�
	Jgamma
Kbeta
Lmoving_mean
Mmoving_variance
N_inbound_nodes
O_outbound_nodes
P_losses
Q	_loss_ids
R_losses_override
S_reduction_axes
T_build_shapes_dict"
_generic_user_object
�
U_inbound_nodes
V_outbound_nodes
W_losses
X	_loss_ids
Y_losses_override
Z_build_shapes_dict"
_generic_user_object
�
[_kernel
\bias
]_inbound_nodes
^_outbound_nodes
__losses
`	_loss_ids
a_losses_override
b_build_shapes_dict"
_generic_user_object
�
c_inbound_nodes
d_outbound_nodes
e_losses
f	_loss_ids
g_losses_override
h_build_shapes_dict"
_generic_user_object
�
i_kernel
jbias
k_inbound_nodes
l_outbound_nodes
m_losses
n	_loss_ids
o_losses_override
p_build_shapes_dict"
_generic_user_object
'
0"
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_dict_wrapper
:	 2SGD/iteration
�B�
!__inference_serving_default_55061inputs"�
���
FullArgSpec
args�

jinputs
varargs
 
varkw
 
defaults
 

kwonlyargs� 
kwonlydefaults
 
annotations� *
 
�B�
3__inference_signature_wrapper_serving_default_55099inputs"�
���
FullArgSpec
args� 
varargs
 
varkw
 
defaults
 

kwonlyargs�

jinputs
kwonlydefaults
 
annotations� *
 
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
+:)@2conv3d/kernel
:@2conv3d/bias
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_dict_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_dict_wrapper
':%@2batch_normalization/gamma
&:$@2batch_normalization/beta
+:)@2batch_normalization/moving_mean
/:-@2#batch_normalization/moving_variance
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_dict_wrapper
.:,@�2conv3d_1/kernel
:�2conv3d_1/bias
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_dict_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_dict_wrapper
*:(�2batch_normalization_1/gamma
):'�2batch_normalization_1/beta
.:,�2!batch_normalization_1/moving_mean
2:0�2%batch_normalization_1/moving_variance
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_dict_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_dict_wrapper
 :
��2dense/kernel
:�2
dense/bias
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_dict_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_dict_wrapper
!:	�2dense_1/kernel
:2dense_1/bias
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_dict_wrapper�
!__inference_serving_default_55061t#$3412<=LMJK[\ij=�:
3�0
.�+
inputs�����������
� "!�
unknown����������
3__inference_signature_wrapper_serving_default_55099�#$3412<=LMJK[\ijG�D
� 
=�:
8
inputs.�+
inputs�����������"3�0
.
output_0"�
output_0���������